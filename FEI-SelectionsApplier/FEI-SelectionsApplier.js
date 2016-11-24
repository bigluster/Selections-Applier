define(['jquery', 'qlik', 'css!./FEI-SelectionsApplier.css', './properties'], function ($, qlik, cssContent, properties) {
    return {
        definition: properties,
        paint: function ($element, layout, jquery,properties) {
            app = qlik.currApp();
            var buttonHTMLCode = '<button name="ApplySelections" id="applySelections" class="applySelections">Apply Selections'+((layout.field=='')?'':' to '+ layout.field)+'</button>';
            var textboxHTMLCode = '<textarea id="selectionsTextboxArea" style="height: 90%;width: 90%;font-size: 10px;"></textarea>';
            $element.html('<table style="height:100%;text-align: center;"><tr><td style="width:20%;">'+buttonHTMLCode+'</td><td style="width:80%;">'+textboxHTMLCode+'</td></tr></table>');
            addOnActivateButtonEvent($element,layout,app);
        }
    };
}); 

//Helper funciton for adding on a "qv-activate" event of button/link
var addOnActivateButtonEvent = function ($element,layout,app) {
    $("#applySelections").on('qv-activate', function () {
        var selectionsInput = document.getElementById("selectionsTextboxArea").value.split('\n');
        selectionsInput = selectionsInput.filter(function(n){ return n != "" });
        selections = layout.isNumeric ? selectionsInput.map(function(item){return parseFloat(item);}) : selectionsInput;
        console.log('Selections to be applied are:', selections);
        app.field(layout.field).selectValues(selections, true,true);
    });
};