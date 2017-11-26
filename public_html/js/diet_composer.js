angular.module("ComposerApp", [])
        .controller("DatabaseController", function(foodDatabase) {
            
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
                    fatGrams: this.newFatGrams
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
            
});