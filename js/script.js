/* global $ */

var dimension = 20;
var colorList = [];

$(document).ready(function() {
    $('#colorpicker').farbtastic('#color');
});

$('#submit').click(function() {
    createGrid($('#dimension').val());
});

function createGrid(n) {
    $('#canvas').empty();
    
    for (var i = 0; i < n*n; i++) {
        $('#canvas').append('<div class="pixel"></div>');
    }
    
    $('#canvas').css({
        width: dimension * n, 
        height: dimension * n
        });
    
    $('.pixel').click(function() {
        var currentColor = $('#color').val();
        
        if (!colorList.includes(currentColor)) {
            colorList.push(currentColor);
            renderColorList();
        }
        
        $(this).css( { background: currentColor } );
    });
}

function renderColorList() {
    $('#color-list').empty();
    
    colorList.forEach(function(element) {
        $('#color-list').append('<div class="color-list-item" style="background: ' + element + ';"></div>');
    })
    
    $('.color-list-item').click(function() {
        var color = $(this).css('backgroundColor');
        $.farbtastic('#colorpicker').setColor( color );
    });
}

$.cssHooks.backgroundColor = {
    get: function (elem) {
        if (elem.currentStyle)
            var bg = elem.currentStyle["backgroundColor"];
        else if (window.getComputedStyle)
            var bg = document.defaultView.getComputedStyle(elem,
                null).getPropertyValue("background-color");
        if (bg.search('rgba') > -1) {
            return '#00ffffff';
        } else {
            if (bg.search('rgb') == -1) {
                return bg;
            } else {
                bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                function hex(x) {
                    return ("0" + parseInt(x).toString(16)).slice(-2);
                }
                return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
            }
        }
    }
};