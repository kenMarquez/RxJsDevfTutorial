import $ from 'jquery';
import Rx from 'rxjs/Rx';

//Rx from events


// //Simple click
// const btn = $('#btn');
// //Create observable from click event
// const btnStream$ = Rx.Observable.fromEvent(btn, 'click');
//
// btnStream$.subscribe(
//     function (e) {
//         console.log("Click")
//     }, function (err) {
//         console.log("err")
//     }, function () {
//         console.log("Completed")
//     });
//
// //Create reference form input and output
// const input = $('#input');
// const output = $('#output');
// //Create observable from keyup event
// const inputStream$ = Rx.Observable.fromEvent(input, 'keyup')
// inputStream$.subscribe(
//     function (e) {
//         console.log(e.currentTarget.value)
//         //Put text change into output div
//         output.text(e.target.value)
//     }, function (err) {
//         console.log("err")
//     }, function () {
//         console.log("Completed")
//     });
//
// //Create observable from mouse move event
// const moveStream$ = Rx.Observable.fromEvent(document, 'mousemove')
// moveStream$.subscribe(
//     function (e) {
//         console.log(e.target.value)
//         output.html('<h1>x: ' + e.clientX + ' y: ' + e.clientY + '</h1>')
//     }, function (err) {
//         console.log("err")
//     }, function () {
//         console.log("Completed")
//     });

// https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/events.md


//------------------------------------------------------------------------------------------

//Rx from Iterable


// //Create simple array
// const numbers = [33, 44, 55, 66, 77]
//
// //Create an observable form this array
// const numbers$ = Rx.Observable.from(numbers)
//
// numbers$.subscribe(
//     v => {
//         console.log(v);
//     },
//     err => {
//         console.log(err);
//     },
//     completed => {
//         console.log("complete");
//     });
//
// //Create posts object
//
// const postsElement = $('#posts');
//
// const posts = [
//     {title: 'post one', body: 'this is the body'},
//     {title: 'post Two', body: 'this is the body'},
//     {title: 'post Three', body: 'this is the body'},
//     {title: 'post Four', body: 'this is the body'}
// ]
//
// Rx.Observable.from(posts).subscribe(
//     posts => {
//         $('#posts').append('<li><h3>' + posts.title + '</h3><p>' + posts.body + '</p></li>')
//     }
// )
//
// //Example iterate other data structures
// const set = new Set(['Hello', 44, {title: 'Mi title'}])
// const set$ = Rx.Observable.from(set)
// set$.subscribe(
//     value => console.log(value)
// )
//
//
// //Short subscribe
// const map = new Map([[1, 2], [2, 3], [5, 6]])
// const map$ = Rx.Observable.from(map)
//     .subscribe(
//         value => console.log(value)
//     )
//
// //Example return observable from other observable
// const map2 = new Map([[3, 22], [2132, 1233], [1235, 1236]])
// const map2$ = Rx.Observable.from(map2)
// map2$.subscribe(
//     value => Rx.Observable.from(value)
//         .subscribe(
//             v => console.log(v)
//         )
// )
//
// // https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/fromarray.md


//------------------------------------------------------------------------------------------

//Rx from Scratch


// //We create a new Observable from 0
// const source$ = new Rx.Observable(observer => {
//     console.log('creating Observable')
//     //Emit function : emit element for all subscribers
//     observer.next("Hello World")
//     observer.next("Another Value")
//     //Emit function : emit an exception for all subscribers
//     observer.error("Something went wrong...")
//     setTimeout(() => {
//         observer.next("Yet a other value")
//         observer.complete()
//     }, 3000)
// })
//
// source$
//     .catch(err => Rx.Observable.of(err))//catch error
//     .subscribe(
//         x => console.log(x),
//         err => console.log(err),
//         complete => console.log("completed")
//     );


//------------------------------------------------------------------------------------------

//Rx from Promise

// //Example how to create a promise from 0
// const myPromise = new Promise((resolve, reject) => {
//     console.log("Creating promise")
//     setTimeout(() => {
//         resolve("hello from promise")
//     }, 3000)
// });
//
// myPromise.then(x => {
//     console.log(x)
// })
//
// //Example how to cobine promise with rx
// const source$ = Rx.Observable.fromPromise(myPromise)
// source$.subscribe(x => console.log(x))
//
// /*
//  * request user to github api
//  * return promise of request
//  */
// function getUser(username) {
//     return $.ajax({
//         url: 'https://api.github.com/users/' + username,
//         dataType: 'jsonp'
//     }).promise()
// }
//
//
// getUser("kenMarquez").then(
//     x => {
//         console.log(x)
//     }
// )
//
// Rx.Observable.fromPromise(getUser("KenMarquez"))
//     .subscribe(x => console.log(x));
//
// Rx.Observable.fromEvent($(username), 'keyup')
//     .subscribe(x => {
//         Rx.Observable.fromPromise(getUser(x.target.value))
//             .subscribe(user => {
//                 console.log(user)
//                 $('#name').text(user.data.name)
//                 $('#blog').text(user.data.company)
//                 $('#repos').text('Public respos: ' + user.data.public_repos)
//             });
//     })
//
//


//------------------------------------------------------------------------------------------

//Rx Operators

/*
 * Genera números en intervalos de 100 ms
 */
// Rx.Observable.interval(2)
//     .take(25)
//     .subscribe(x => console.log(x));

//Toma elementos dentro de un rango de 10 a 100
// Rx.Observable.range(15, 25)
//     .subscribe(x => console.log(x))


Rx.Observable.range(15, 500)
    .filter(x => (x % 2 == 0))
    .take(5)
    .subscribe(x => console.log(x))

//El orden en el que se aplican las funciones es muy importante
Rx.Observable.range(15, 500)
    .take(5)
    .filter(x => (x % 2 == 0))
    .subscribe(x => console.log(x))

//Map allow apply function to items after tu emmit to subscribers
Rx.Observable.from(['Jhon', 'asd', 'aasd'])
    .map(v => v.toUpperCase())
    .map(v => 'I am ' + v.toUpperCase())
    .subscribe(v => console.log(v))

/*
 * request user to github api
 * return promise of request
 */
function getUser(username) {
    return $.ajax({
        url: 'https://api.github.com/users/' + username,
        dataType: 'json'
    }).promise()
}

function getRepos(username) {
    return $.ajax({
        url: 'https://api.github.com/users/' + username,
        dataType: 'json'
    }).promise()
}

Rx.Observable.fromEvent($(username), 'keyup')
    .map(x => x.target.value)
    .switchMap(v => Rx.Observable.fromPromise(getUser(v)))
    .subscribe(user => console.log(user))


