/*
GUI Assignment: hw4 pt2
David Sun, UMass Lowell Computer Science, david_sun@student.uml.edu 
Copyright (c) 2023 by David Sun. All rights reserved. May be freely copied 
or excerpted for educational purposes with credit to the author. 
updated by DS on December 05, 2023 at 12:47 AM 
*/

// Execute when the DOM is fully loaded
$(function () {
    // Initialize sliders
    $("#minColValSlider").slider({
        range: "min",
        value: 0,
        min: -50,
        max: 50,
        slide: function (event, ui) {
            $("#minColVal").val(ui.value);
            handleFormSubmission($('#multiplicationForm'));
        }
    });
    $("#maxColValSlider").slider({
        range: "min",
        value: 0,
        min: -50,
        max: 50,
        slide: function (event, ui) {
            $("#maxColVal").val(ui.value);
            handleFormSubmission($('#multiplicationForm'));
        }
    });
    $("#minRowValSlider").slider({
        range: "min",
        value: 0,
        min: -50,
        max: 50,
        slide: function (event, ui) {
            $("#minRowVal").val(ui.value);
            handleFormSubmission($('#multiplicationForm'));
        }
    });
    $("#maxRowValSlider").slider({
        range: "min",
        value: 0,
        min: -50,
        max: 50,
        slide: function (event, ui) {
            $("#maxRowVal").val(ui.value);
            handleFormSubmission($('#multiplicationForm'));
        }
    });


    // Initialize jQuery UI Tabs
    $("#tabs").tabs({
        activate: function (event, ui) {
            // Reinitialize validation when a tab is activated
            var activeForm = ui.newPanel.find('form');
            initializeValidation(activeForm);
        }
    });

    // Initialize validation for the initial form
    initializeValidation($('#multiplicationForm'));

    // Bind the input event to the specified fields
    $('#minColVal, #maxColVal, #minRowVal, #maxRowVal').on('input', function() {
        updateSliders();
        handleFormSubmission($('#multiplicationForm'));
    });
});

// Update sliders based on input values
function updateSliders() {
    $("#minColValSlider").slider("value", parseInt($("#minColVal").val()));
    $("#maxColValSlider").slider("value", parseInt($("#maxColVal").val()));
    $("#minRowValSlider").slider("value", parseInt($("#minRowVal").val()));
    $("#maxRowValSlider").slider("value", parseInt($("#maxRowVal").val()));
}

function initializeValidation(form) {
    // Specifies the greaterThan and lessThan functions. Each function validates that its two input values have either a less than or greater than relationship.
    $.validator.addMethod("greaterThan", function (value, element, param) {
        return this.optional(element) || parseInt(value, 10) > parseInt($(param).val(), 10);
    });
    $.validator.addMethod("lessThan", function (value, element, param) {
        return this.optional(element) || parseInt(value, 10) <parseInt($(param).val(), 10);
    });

    // Initialize jQuery Validation Plugin
    form.validate({
        rules: {
            col1: {
                required: true,
                number: true,
                range: [-50, 50],
                lessThan: "#maxColVal"
            },
            col2: {
                required: true,
                number: true,
                range: [-50, 50],
                greaterThan: "#minColVal"
            },
            row1: {
                required: true,
                number: true,
                range: [-50, 50],
                lessThan: "#maxRowVal"
            },
            row2: {
                required: true,
                number: true,
                range: [-50, 50],
                greaterThan: "#minRowVal"
            }
        },
        messages: {
            col1: {
                required: "Please enter a value for Smallest Column Value.",
                number: "Please enter a valid number.",
                range: "Please enter a number between -50 and 50.",
                lessThan: "Please make sure this number is less than the Biggest Column Value."
            },
            col2: {
                required: "Please enter a value for Biggest Column Value.",
                number: "Please enter a valid number.",
                range: "Please enter a number between -50 and 50.",
                greaterThan: "Please make sure this number is greater than the Smallest Column Value."
            },
            row1: {
                required: "Please enter a value for Smallest Row Value.",
                number: "Please enter a valid number.",
                range: "Please enter a number between -50 and 50.",
                lessThan: "Please make sure this number is less than the Biggest Row Value."
            },
            row2: {
                required: "Please enter a value for Biggest Row Value.",
                number: "Please enter a valid number.",
                range: "Please enter a number between -50 and 50.",
                greaterThan: "Please make sure this number is greater than the Smallest Row Value."
            }
        },
        submitHandler: function (form) {
            // Extract values from the form
            var col1 = parseInt($("#minColVal").val());
            var col2 = parseInt($("#maxColVal").val());
            var row1 = parseInt($("#minRowVal").val());
            var row2 = parseInt($("#maxRowVal").val());

            // Clear previous table content
            $("#tableContainer").empty();

            // Generate the table
            generateTable(col1, col2, row1, row2);
        }
    });
}

// Function to handle form submission
function handleFormSubmission(form) {
    form.valid();  // Trigger validation
}

function generateTable(minCol, maxCol, minRow, maxRow) {
    // Create a new HTML table element and assign it to ( var table )
    var table = document.createElement("table");

    // Create the header row of the table where the leftmost cell is null
    var headerRow = document.createElement("tr");
    var nullCell = document.createElement("th");
    headerRow.appendChild(nullCell);
    for (var col = minCol; col <= maxCol; col++) {
        var cell = document.createElement("th");
        cell.textContent = col;
        headerRow.appendChild(cell);
    }
    table.appendChild(headerRow);
    

    // Generate the cells of the rest of the table
    for (var row = minRow; row <= maxRow; row++) {
        var tableRow = document.createElement("tr");
        var headerCell = document.createElement("td");
        headerCell.textContent = row;
        tableRow.appendChild(headerCell);
        for (var col = minCol; col <= maxCol; col++) {
            var val = col * row;
            var cell = document.createElement("td");
            cell.textContent = val;
            tableRow.appendChild(cell);
        }
        table.appendChild(tableRow);
    }
    tableContainer.appendChild(table);
}