(function () {

   var db = null;

   function openDatabase() {
      db.transaction(function (tx) {
         tx.executeSql('CREATE TABLE IF NOT EXISTS notes(name,notes)');
      }, function (err) {
         console.log('Open database ERROR: ' + JSON.stringify(err));
      });
   }

   function add(name, note) {
      db.transaction(function (tx) {
         tx.executeSql('INSERT INTO notes(name,notes) VALUES(?,?)', [name, note], function (tx, res) {
            alert('Note Added');
         }, function (error) {
            console.log('failed to insert data' + JSON.stringify(error));
         });
      }, function (error) {
         console.log('transaction error' + JSON.stringify(error));
      });
   }


   function onDeviceReady() {
      angular.bootstrap(document.body, ['makeNotes']);
      //manually bootstrapping angularjs in the body

      db = window.sqlitePlugin.openDatabase({
         name: 'note.db',
         location: 'default'
      });

      openDatabase();
   }

   var makeNotes = angular.module('makeNotes', ['ui.router']);
   makeNotes.controller('takeNoteController', ['$scope', function ($scope) {
      $scope.addNote = function () {
         add($scope.name, $scope.note);
      };
   }]);


   document.addEventListener('deviceready', onDeviceReady, false);
   document.addEventListener('DOMContentLoaded', function () {
      M.AutoInit();
      //initialize materialize
   });



})();