function MainController($scope, $timeout, $http, $filter) {
    getPhotos();
    var count = 0;
    $scope.photos = '';
    $scope.mainTitle = 'Performant $Angular';
    $scope.ngBindTitle = 'Ng-Bind';
    $scope.interpolatedTitle = 'Interpolated';
    $scope.linkTitle = 'Via Link function';
    $scope.compileTitle = 'Via $complie';
    $scope.debouncingInputsTitle = 'Deboucing Inputs: with ng-model-options';
    $scope.ngChangeTitle = 'ng-change vs $Scope.$watch';
    $scope.oneTimeBindingsTitle = '{{::One-Time-Bindings}} & $scope.digest';
    $scope.placeHolderText = 'The ship\'s all yours. If the scanners pick up anything, report it immediately. All right, let\'s go. Hey down there, could you give us a hand with this? TX-four-one-two. Why aren\'t you at your post? TX-four-one-two, do you copy? Take over. We\'ve got a bad transmitter. I\'ll see what I can do. You know, between his howling and your blasting everything in sight, it\'s a wonder the whole station doesn\'t know we\'re here. Bring them on! I prefer a straight fight to all this sneaking around. We found the computer outlet, sir. Plug in. He should be able to interpret the entire Imperial computer network.';

    function getPhotos() {
        var API = 'http://jsonplaceholder.typicode.com/photos';
        return $http
            .get(API)
            .then(function(response) {
                $scope.photos = response.data.slice(0, 100);
                return response.data;
            })
            .catch(function(reason) {
                return reason;
            });
    }

    $scope.filterChars = function(name) {
        console.log('Digest Cycle\'s fired:', count);
        $scope.filteredCharacters = $filter('filter')($scope.characters, name);
        count++;
    };

    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    $scope.reversePhotos = function() {
        console.log('Digest Cycle fired for every item in array length of', $scope.photos.length, 'items.');
        return $scope.photos = shuffle($scope.photos);
    };

    $scope.$watch('noDebouce', function(newValue, oldValue, scope) {
        if (!newValue) return;

        console.count('Digest Cycle\'s fired:');
    });

    // List of friends with a predefined class;
    $scope.friends = [{
        "id": 0,
        "name": "Lopez Hogan",
        "type": "error"
    }, {
        "id": 1,
        "name": "Cannon Bailey",
        "type": "warning"
    }, {
        "id": 2,
        "name": "Mccall Bright",
        "type": "info"
    }, {
        "id": 3,
        "name": "Boone Skinner",
        "type": "error"
    }, {
        "id": 4,
        "name": "Bailey Slater",
        "type": "warning"
    }, {
        "id": 5,
        "name": "Rosario Villarreal",
        "type": "info"
    }, {
        "id": 6,
        "name": "Brooks Kline",
        "type": "error"
    }, {
        "id": 7,
        "name": "Vanessa Franklin",
        "type": "warning"
    }, {
        "id": 8,
        "name": "Erickson Wiley",
        "type": "info"
    }, {
        "id": 9,
        "name": "Ola Noel",
        "type": "error"
    }];

    $scope.characters = [{
        'name': 'Mon Mothma',
        "id": 0,
    }, {
        'name': 'Tigris',
        "id": 1,
    }, {
        'name': 'Jabba the Hutt',
        "id": 2,
    }, {
        'name': 'Talon Karrde',
        "id": 3,
    }, {
        'name': 'Gethzerion',
        "id": 4,
    }, {
        'name': 'Princess Kneesaa',
        "id": 5,
    }, {
        'name': 'Elder Sh \'tk\'ith',
        "id": 6,
    }, {
        'name': '4 - LOM',
        "id": 7,
    }, {
        'name': 'IG - 88',
        "id": 8,
    }, {
        'name': 'Yoda',
        "id": 9,
    }];
    $scope.filterFriends = $scope.friends;
    $scope.filteredCharacters = $scope.characters;
}

MainController.$inject = ['$scope', '$timeout', '$http', '$filter'];

angular
    .module('app', [])
    .controller('MainController', MainController);

function compileTitle() {
    return {
        restrict: 'A',
        scope: {},
        controller: 'MainController',
        compile: function($element, $attrs) {
            var elm = $element[0];
            elm.innerHTML = '$Complied';
            return function postLink($scope, $element, $attrs) {};
        }
    };
}

function compileList() {
    return {
        restrict: 'A',
        compile: function($element, $attrs) {
            //propogates base class for directives. Without having to call it twice.
            angular.element($element[0]).addClass('base');
            console.log('Base class here once, along with any other precompiled settings.');
            return function postLink($scope, $element, $attrs) {
                console.log('Arbitrary class here as many times as friends');
                angular.element($element[0]).addClass($attrs.type);
            };
        }
    };
}

function linkList() {

    function link($scope, $element, $attrs) {
        console.count('Base class and arbitrary class added equal amount of times.');
        $element[0].className = 'base';
        angular.element($element[0]).addClass($attrs.type);
    }

    return {
        restrict: 'A',
        link: link
    };
}

function compiledNameDirectice() {
    return {
        restrict: 'E',
        compile: function($element, $attrs) {
            angular.element($element[0]).addClass('compiled-name-class');
            return function postLink($scope, $element, $attrs) {
                angular.element($element[0]).innerHTML = $attrs.name;
            };
        }
    };
}

angular
    .module('app')
    .directive('compileTitle', compileTitle)
    .directive('compileList', compileList)
    .directive('linkList', linkList)
    .directive('compiledNameDirectice', compiledNameDirectice);