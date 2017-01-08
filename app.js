/**
 * Created by nasidulislam on 9/30/16.
 */

var data = [
    {
        "name": "Test Task #1",
        "date": "12/01/2012",
        "assigned": "John Doe"
    },
    {
        "name": "Test Task #2",
        "date": "12/02/2012",
        "assigned": "John Doe"
    },
    {
        "name": "Test Task #3",
        "date": "12/03/2012",
        "assigned": "John Doe"
    },
    {
        "name": "Test Task #4",
        "date": "12/04/2012",
        "assigned": "John Doe"
    },
    {
        "name": "Test Task #5",
        "date": "12/05/2012",
        "assigned": "John Doe"
    },
    {
        "name": "Test Task #6",
        "date": "12/06/2012",
        "assigned": "John Doe"
    },
    {
        "name": "Test Task #7",
        "date": "12/07/2012",
        "assigned": "John Doe"
    }
];

(function () {
    'use strict';

    function appendTask(task) {
        var table = document.querySelector('table');
        var row   = table.insertRow();

        for (var property in task) {
            var val   = task[property];
            var child = document.createTextNode(val);

            row.insertCell().appendChild(child)
        }
    }

    data.forEach(appendTask);

    function clearFormValues(form) {
        for (var i in [0, 1, 2]) {
            form.elements[i].value = ''
        }
    }

    function isFullyPopulatedTask(task) {
        return (task.name && task.date && task.assigned)
    }

    function isValidDate(date) {

        // Check for pattern
        if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date))
            return false;

        // Declare variables
        var parts, day, month, year, monthLength;

        // Parse the date components to integers
        parts = date.split("/");
        day = parseInt(parts[1], 10);
        month = parseInt(parts[0], 10);
        year = parseInt(parts[2], 10);

        // Range check for month and year -> can be edited to appropriate requirement
        if(year < 1000 || year > 3000 || month == 0 || month > 12)
            return false;

        monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

        // Adjust for leap years
        if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;

        // Range check for day
        return day > 0 && day <= monthLength[month - 1];
    }

    function mapFormElements(form) {
        return {
            name:     form.elements[0].value,
            date:     form.elements[1].value,
            assigned: form.elements[2].value
        }
    }

    function prependTask(task) {
        var table = document.querySelector('table');
        var row   = table.insertRow(0);

        for (var property in task) {
            var val   = task[property];
            var child = document.createTextNode(val);

            row.insertCell().appendChild(child)
        }
    }

    document.querySelector('button').addEventListener('click', function (event) {
        event.preventDefault();
        var task = mapFormElements(this.form);

        if (!isFullyPopulatedTask(task)) {
            alert('All form fields must be populated.');

            return false
        }

        if (!isValidDate(task.date)) {
            alert('The "Date" must be in `mm/dd/yyyy` format.');

            return false
        }

        prependTask(task);
        clearFormValues(this.form)
    })
})();