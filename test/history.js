var expect = require("chai").expect;
var history = require("../src/history");

describe("Event history", function () {

  describe("logEvent", function () {

    it("adds a event to the history", function () {
      history.logEvent("Event");
      expect(history.getEvents()).to.have.length(1);
    });


    after(function () {
      history.clear();
    });

  });

  describe("getEvents", function () {
    before(function () {
      history.logEvent("Event 1");
      history.logEvent("Event 2");
      console.log("before");
    });

    it("has two elements", function () {
      expect(history.getEvents()).to.have.length(2);
    })

    it("should be a deep copy", function () {

      var copy = history.getEvents();

      copy[0].description = "";

      expect(copy[0].description).to.not.be.equal(history.getEvent(0).description);

    });

    after(function () {
      history.clear();
    });

    describe("getEvent", function () {
      before(function () {
        history.logEvent("Event 1");
        history.logEvent("Event 2");
        console.log("before");
      });

      it("index 1 should be the first one inserted", function () {
        expect(history.getEvent(1).description).to.equal("Event 1");
      });

      after(function () {
        history.clear();
      });
    });

    describe("max Size", function () {
      before(function () {
        for( i=0;i<502;i++) {
          history.logEvent("Event");
        }
      });

      it("there should be only 500 items in the history", function () {
        expect(history.getEvents()).to.have.length(500);
      });

      after(function () {
        history.clear();
      });
    });

  });
});
