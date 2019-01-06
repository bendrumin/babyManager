myApp.controller('PeopleController', ['$http', function($http) {
  var vm = this;
  vm.newPerson = {};
  vm.allMeds = [];



  // vm.addMedication = {};
  // get the people data from the server and fill the DOM
  getPeople();

  vm.addPerson = function(name, phoneNumber, notes) {
    vm.newPerson = {
      name: name,
      phoneNumber: phoneNumber,
      notes: notes,
      allMeds: vm.allMeds
    };
    console.log('data object going to server: ', vm.newPerson);
    $http.post('/person', vm.newPerson)
    .then(function(response) {
      console.log('added person: ', response);
      getPeople();
      successMessage();

    });
  }
  vm.updatePerson = function(patient) {
    console.log('updating person:', patient);
    $http.put('/person', patient)
      .then(function(response) {
        getPeople();
        saveMessage();
      });
  }
  vm.deletePerson = function(id) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E3968B',
      cancelButtonColor: '#839EAC',
      confirmButtonText: 'Yes, delete it!'
    }).then(function () {
      $http.delete('/person/' + id)
      .then(function(response) {
        getPeople();
      });
      swal(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    })
    console.log('delete person with id: ', id);

  }
  function successMessage() {
    swal({
      title: "Success!",
      text: "The patient has been added",
      confirmButtonText: "View Patients",
      confirmButtonColor: '#839EAC',
      type: "success"
    }).then(function() {
           window.location.href = "#/info";
       })
  }
  function saveMessage() {
    swal({
      title: "Great!",
      text: "Your changes have been saved!",
      type: "success",
      confirmButtonColor: '#839EAC'
    })
  };
  function deleteMessage() {
    };
  function getPeople() {
    $http.get('/person').then(function(response) {
      console.log('This is what logs out:', response.data);
      vm.people = response.data;
    });
  }
  vm.addMedication = function(med, dosage, timeOne, timeTwo, timeThree, timeFour, timeFive) {
    var newMed = {
      medication: med,
      dosage: dosage,
      timeOne: timeOne,
      timeTwo: timeTwo,
      timeThree: timeThree,
      timeFour: timeFour,
      timeFive: timeFive
    }
    console.log(vm.newPerson.medication);
    vm.allMeds.push(newMed);
    console.log(dosage);
    console.log(vm.allMeds);

    allMeds = [];
    vm.newPerson.medication = "";
    vm.newPerson.dosage = "";
    // newPerson.timeOne = "";
    vm.newPerson.timeTwo = "";
    vm.newPerson.timeThree = "";
    vm.newPerson.timeFour = "";
    vm.newPerson.timeFive = "";
  }
}]);
