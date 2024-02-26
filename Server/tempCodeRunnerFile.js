/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('QuizUsers');

// Search for documents in the current collection.
db.getCollection('questions')
  .find(
    {
      /*
      * Filter
      * fieldA: value or expression
      */
        createdBy: "65d64f402cd1b38d4ffff51c"
    },
    {
      /*
      * Projection
      * _id: 0, // exclude _id
      * fieldA: 1 // include field
      */
    }
  )
  .sort({
    /*
    * fieldA: 1 // ascending
    * fieldB: -1 // descending
    */
  });
