import $ from 'jquery';
import Rx from 'rxjs/Rx';

//Rx from events


//Simple click
const btn = $('#btn');
//Create observable from click event
const btnStream$ = Rx.Observable.fromEvent(btn, 'click');

btnStream$.subscribe(
    function (e) {
        console.log("Click")
    }, function (err) {
        console.log("err")
    }, function () {
        console.log("Completed")
    });

//Create reference form input and output
const input = $('#input');
const output = $('#output');
//Create observable from keyup event
const inputStream$ = Rx.Observable.fromEvent(input, 'keyup')
inputStream$.subscribe(
    function (e) {
        console.log(e.currentTarget.value)
        //Put text change into output div
        output.text(e.target.value)
    }, function (err) {
        console.log("err")
    }, function () {
        console.log("Completed")
    });

//Create observable from mouse move event
const moveStream$ = Rx.Observable.fromEvent(document, 'mousemove')
moveStream$.subscribe(
    function (e) {
        console.log(e.target.value)
        output.html('<h1>x: ' + e.clientX + ' y: ' + e.clientY + '</h1>')
    }, function (err) {
        console.log("err")
    }, function () {
        console.log("Completed")
    });

// https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/events.md