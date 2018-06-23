angular.module("ComposerApp", [])
        .factory("foodListing", function() {
            return [];
})
        .controller("DatabaseController", function(foodDatabase, foodListing) {
            
            this.database = foodDatabase;
            
            this.addRow = function() {
                
                var hasUndefined = false;
                var property;
                
                var newRow = {
                    servingSize: this.newServingSize,
                    servingSizeGrams: this.newServingSizeGrams,
                    foodName: this.newFoodName,
                    proteinGrams: this.newProteinGrams,
                    carbGrams: this.newCarbGrams,
                    fatGrams: this.newFatGrams,
                };
                
                for (property in newRow) {
                    if (newRow.hasOwnProperty(property)) {
                        if (newRow[property] === undefined) {
                            hasUndefined = true;
                        }
                    }
                }
                
                if (!hasUndefined) {
                    
                    this.database.push(newRow);
                    
                    //regretfully, undefined is the value all these properties must be set to.
                    delete this.newServingSize;
                    delete this.newServingSizeGrams;
                    delete this.newFoodName;
                    delete this.newProteinGrams;
                    delete this.newCarbGrams;
                    delete this.newFatGrams;
                    
                }
                
            };
            
            this.deleteRow = function(row) {
                this.database.splice(this.database.indexOf(row), 1);
            };
            
            this.sendUp = function(row) {
                
                var item = {
                    servingSize: row.servingSize,
                    servingSizeGrams: row.servingSizeGrams,
                    foodName: row.foodName,
                    proteinGrams: row.proteinGrams,
                    carbGrams: row.carbGrams,
                    fatGrams: row.fatGrams
                };
                
                item.totalProteinGrams = item.proteinGrams;
                item.totalCarbGrams = item.carbGrams;
                item.totalFatGrams = item.fatGrams;
                
                var holdRemaining = barChartData.datasets.pop();
                
                item.label = item.foodName;
                item.data = [
                    item.totalProteinGrams,
                    item.totalCarbGrams,
                    item.totalFatGrams
                ];
                var color = generateColorString();
                item.backgroundColor = color + ".4)";
                item.hoverBackgroundColor = color + ".8)";
                
                barChartData.datasets.push(item);
                
                barChartData.datasets.push(holdRemaining);
                
                setRemaining();
                
                composerChart.update();
                
                foodListing.push(item);
                
            };
            
})
        .controller("ListingController", function(foodListing) {
            
            this.list = foodListing;
            
            this.updateItem = function(item) {
                
                item.totalProteinGrams = parseFloat((item.quantity * item.proteinGrams).toFixed(1));
                item.totalCarbGrams = parseFloat((item.quantity * item.carbGrams).toFixed(1));
                item.totalFatGrams = parseFloat((item.quantity * item.fatGrams).toFixed(1));
                
                item.data = [
                    item.totalProteinGrams,
                    item.totalCarbGrams,
                    item.totalFatGrams
                ];
                
                setRemaining();
                
                composerChart.update();
                
            };
            
            this.deleteItem = function(item) {
                this.list.splice(this.list.indexOf(item), 1);
                barChartData.datasets.splice(barChartData.datasets.indexOf(item), 1);
                setRemaining();
                composerChart.update();
            };
            
})
        .controller("TargetsController", function($scope) {
            
            this.updateTargets = function() {
                barChartData.datasets[barChartData.datasets.length - 1].targets = [
                    $scope.proteinTarget,
                    $scope.carbTarget,
                    $scope.fatTarget
                ]
                setRemaining();
                composerChart.update();
            };
            
});

var setRemaining = function() {
    
    var remaining = barChartData.datasets[barChartData.datasets.length - 1];
    
    var proteinDifference = remaining.targets[0] - total(0);
    remaining.data[0] = proteinDifference < 0 ? 0 : proteinDifference;
    
    var carbDifference = remaining.targets[1] - total(1);
    remaining.data[1] = carbDifference < 0 ? 0 : carbDifference;
    
    var fatDifference = remaining.targets[2] - total(2);
    remaining.data[2] = fatDifference < 0 ? 0 : fatDifference;
    
};

var total = function(macroIndex) {
    var holdRemaining = barChartData.datasets.pop();
    var sum = 0;
    barChartData.datasets.forEach(function(dataset) {
        sum += dataset.data[macroIndex];
    });
    barChartData.datasets.push(holdRemaining);
    return sum;
};

var generateColorString = function() {
    
    const NARROWER = 6;
    
    var red   = randomFromTo(NARROWER/2, 25/2) * 20 + 5;
    var green = randomFromTo(NARROWER/2, 25/2) * 20 + 5;
    var blue  = randomFromTo(NARROWER/2, 25/2) * 20 + 5;
    
    return `rgba(${red},${green},${blue},`
    
};

var randomFromTo = function (minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};