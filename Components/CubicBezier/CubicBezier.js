(function(){

  /* Settings */

  var NEWTON_ITERATIONS = 4;
  var NEWTON_MIN_SLOPE = 0.001;
  var SUBDIVISION_PRECISION = 0.0000001;
  var SUBDIVISION_MAX_ITERATIONS = 10;

  var kSplineTableSize = 11;
  var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

  var float32ArraySupported = typeof Float32Array === 'function';

  /* Logic */

  var A = function(aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; };
  var B = function(aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; };
  var C = function(aA1)      { return 3.0 * aA1; };

  var calcBezier = function(aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT; };
  var getSlope   = function(aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1); };

  var binarySubdivide = function(aX, aA, aB, mX1, mX2) {
    var currentX, currentT, i = 0;

    do {
      currentT = aA + (aB - aA) / 2.0;
      currentX = calcBezier(currentT, mX1, mX2) - aX;

      if (currentX > 0.0) {
        aB = currentT;
      } else {
        aA = currentT;
      }
    } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);

    return currentT;
  };

  var newtonRaphsonIterate = function(aX, aGuessT, mX1, mX2) {
    for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
      var currentSlope = getSlope(aGuessT, mX1, mX2);

      if (currentSlope === 0.0) {
        return aGuessT;
      }

      var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
      aGuessT -= currentX / currentSlope;
    }

    return aGuessT;
  };

  var getTForX = function(aX, x1, x2, sampleValues) {
    var intervalStart = 0.0;
    var currentSample = 1;
    var lastSample = kSplineTableSize - 1;

    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }

    currentSample--;

    var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    var guessForT = intervalStart + dist * kSampleStepSize;
    var initialSlope = getSlope(guessForT, x1, x2);

    if (initialSlope >= NEWTON_MIN_SLOPE) {
      return newtonRaphsonIterate(aX, guessForT, x1, x2);
    } else if (initialSlope === 0.0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, x1, x2);
    }
  };

  /* CubicBezierObject */

  var CubicBezierObject = function(x1, y1, x2, y2) {
    if (!(0 <= x1 && x1 <= 1 && 0 <= x2 && x2 <= 1)) {
      throw new Error('bezier x values must be in [0, 1] range');
    }

    this.sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);

    for (var i = 0; i < kSplineTableSize; ++i) {
      this.sampleValues[i] = calcBezier(i * kSampleStepSize, x1, x2);
    }

    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  };

  CubicBezierObject.prototype.x1;
  CubicBezierObject.prototype.y1;
  CubicBezierObject.prototype.x2;
  CubicBezierObject.prototype.y2;
  CubicBezierObject.prototype.sampleValues;

  CubicBezierObject.prototype.GetProgression = function(time) {
    if (this.x1 == this.y1 && this.x2 == this.y2) {
      return time;
    }

    if (time === 0 || time === 1) {
      return time;
    }

    return calcBezier(getTForX(time, this.x1, this.x2, this.sampleValues), this.y1, this.y2);
  };

  Core.AddComponent('CubicBezier', {
    Ease:      new CubicBezierObject(.25, .1, .25, 1),
    EaseIn:    new CubicBezierObject(.42, 0, 1, 1),
    EaseOut:   new CubicBezierObject(0, 0, .58, 1),
    EaseInOut: new CubicBezierObject(.42, 0, .58, 1),
    Linear:    new CubicBezierObject(.5, .5, .5, .5),

    CubicBezierObject: CubicBezierObject,

    Create: function(x1, y1, x2, y2){
      return new CubicBezierObject(x1, y1, x2, y2);
    }
  });
})();