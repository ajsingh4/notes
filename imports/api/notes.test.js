import expect from "expect";
import {Meteor} from "meteor/meteor";
import {Notes} from "./notes";

if (Meteor.isServer) {
  describe("notes", function() {

    beforeEach(function() {
      Notes.remove({});
      Notes.insert({
        _id: "testNoteId1",
        title: "My Title",
        body: "My body for note",
        updatedAt: 0,
        userId: "testUserId1"
      });
    });

    it("should insert new note", function() {
      const userId = "testid"
      const _id = Meteor.server.method_handlers["notes.insert"].apply({userId});
      expect(Notes.findOne({_id, userId})).toExist();
    });

    it("should not insert new note if not authenticated", function() {
      expect(() => {
        Meteor.server.method_handlers["notes.insert"]();
      }).toThrow();
    });

    it("should remove note", function() {
      Meteor.server.method_handlers["notes.remove"].apply({userId: "testUserId1"}, ["testNoteId1"]);
      expect(Notes.findOne({_id: "testNoteId1"})).toNotExist();
    });

    it("should not remove note if unauthenticated", function() {
      expect(() => {
        Meteor.server.method_handlers["notes.remove"].apply({}, ["testNodeId1"]);
      }).toThrow();
    });

    it("should not remove note if invalid _id", function() {
      expect(() => {
          Meteor.server.method_handlers["notes.remove"].apply({userId: "testUserId1"});
      }).toThrow();
    })
  });
}
