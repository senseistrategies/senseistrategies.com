//Module for containment of diet calculator.
DIET_CALCULATOR = {
    
    //Define a closure to return the diet calculator master function.
    retrieveDietCalculatorFunction: function() {
        
        //Private members should be defined here.
        
        const INCHES_TO_CENTIMETERS_MULTIPLIER = 2.54;
        const POUNDS_TO_KILOGRAMS_MULTIPLIER = .453592;
        
        const CALORIES_PER_GRAM_PROTEIN = 4;
        const CALORIES_PER_GRAM_CARB = 4;
        const CALORIES_PER_GRAM_FAT = 9;
        
        var activityLevelDictionary = {
            "sedentary": 1.2,
            "light": 1.375,
            "moderate": 1.55,
            "heavy": 1.725,
            "extreme": 1.9
        };
        
        var weightIntentDictionary = {
            "losefast": .8,
            "lose": .85,
            "maintain": 1,
            "gain": 1.1,
            "gainfast": 1.15
        };
        
        var heightInInches;
        var weightInPounds;
        var ageInYears;
        var activityLevelSelection;
        var weightIntentSelection;
        var proteinMultiplier;
        //  fatPercentage;
        
        var activityLevelMultiplier;
        var weightIntentMultiplier;
        
        var proteinCalories;
        var proteinGrams;
        var proteinPercentage;
        
        var carbsCalories;
        var carbsGrams;
        var carbsPercentage;
        
        var fatCalories;
        var fatGrams;
        var fatPercentage;
        
        var totalGrams;
        //  totalCalories;
        
        var baseMetabolicRate;
        var caloricMaintenanceRate;
        var caloricTarget;
        
        var heightInCentimeters;
        var weightInKilograms;
        
        //formatting outputs
        
        var formattedBaseMetabolicRate;
        var formattedMaintenanceRate;
        var formattedCaloricTarget;
        
        var formattedProteinCalories;
        var formattedProteinGrams;
        var formattedProteinPercentage;
        
        var formattedCarbsCalories;
        var formattedCarbsGrams;
        var formattedCarbsPercentage;
        
        var formattedFatCalories;
        var formattedFatGrams;
        var formattedFatPercentage;
        
        var formattedTotalGrams;
        var formattedTotalCalories;
        
        var calculateDiet = function() {
            
            //collect values
            //perform calculations, preparing outputs
            //format the outputs
            //don't return anything, but have side effects. We will go around changing the targets.
            
            //Take values from html.
            heightInInches = document.getElementById("height-in-inches-input").value;
            weightInPounds = document.getElementById("weight-in-pounds-input").value;
            ageInYears = document.getElementById("age-input").value;
            activityLevelSelection = document.querySelector("input[name=activity-level-namegroup]:checked").value;
            weightIntentSelection = document.querySelector("input[name=weight-intent-namegroup]:checked").value;
            proteinMultiplier = document.getElementById("protein-multiplier-input").value;
            fatPercentage = document.getElementById("fat-percentage-input").value;
            
            //Now we will prepare other variables for use in calculations.
            activityLevelMultiplier = activityLevelDictionary[activityLevelSelection];
            weightIntentMultiplier = weightIntentDictionary[weightIntentSelection];
            
            //Perform calculations
            
            //Convert to metric for equation usage
            heightInCentimeters = heightInInches * INCHES_TO_CENTIMETERS_MULTIPLIER;
            weightInKilograms = weightInPounds * POUNDS_TO_KILOGRAMS_MULTIPLIER;
            
            //Calculate BMR, maintenance rate, and target calories
            
            //  \/THE EQUATION\/
            baseMetabolicRate = 10 * weightInKilograms + 6.25 * heightInCentimeters - 5 * ageInYears + 5;
            //  /\            /\
            
            caloricMaintenanceRate = baseMetabolicRate * activityLevelMultiplier;
            caloricTarget = caloricMaintenanceRate * weightIntentMultiplier;
            
            //Protein puzzle
            proteinGrams = weightInPounds * proteinMultiplier;
            proteinCalories = proteinGrams * CALORIES_PER_GRAM_PROTEIN;
            proteinPercentage = (proteinCalories / caloricTarget) * 100;
            
            //Fat puzzle
            fatCalories = caloricTarget * (fatPercentage / 100);
            fatGrams = fatCalories / CALORIES_PER_GRAM_FAT;
            
            //Carbs puzzle
            carbsCalories = caloricTarget - proteinCalories - fatCalories;
            carbsGrams = carbsCalories / CALORIES_PER_GRAM_CARB;
            carbsPercentage = (carbsCalories / caloricTarget) * 100;
            
            //Totals
            totalGrams = proteinGrams + carbsGrams + fatGrams;
            
            //Format results for output
            formattedBaseMetabolicRate = Math.round(baseMetabolicRate);
            formattedMaintenanceRate = Math.round(caloricMaintenanceRate);
            formattedCaloricTarget = Math.round(caloricTarget);
            
            formattedProteinCalories = Math.round(proteinCalories).toString().padStart(5).replace(/ /g, "&nbsp;") + " cal";
            formattedProteinGrams = Math.round(proteinGrams).toString().padStart(4).replace(/ /g, "&nbsp;") + "g";
            formattedProteinPercentage = Math.round(proteinPercentage) + "%";

            formattedCarbsCalories = Math.round(carbsCalories).toString().padStart(5).replace(/ /g, "&nbsp;") + " cal";
            formattedCarbsGrams = Math.round(carbsGrams).toString().padStart(4).replace(/ /g, "&nbsp;") + "g";
            formattedCarbsPercentage = Math.round(carbsPercentage) + "%";

            formattedFatCalories = Math.round(fatCalories).toString().padStart(5).replace(/ /g, "&nbsp;") + " cal";
            formattedFatGrams = Math.round(fatGrams).toString().padStart(4).replace(/ /g, "&nbsp;") + "g";
            formattedFatPercentage = Math.round(fatPercentage) + "%";

            formattedTotalGrams = Math.round(totalGrams).toString().padStart(4).replace(/ /g, "&nbsp;") + "g";
            formattedTotalCalories = Math.round(caloricTarget).toString().padStart(5).replace(/ /g, "&nbsp") + " cal";
            
            //Output to HTML
            
            document.getElementById("base-metabolic-rate-output").innerHTML = formattedBaseMetabolicRate;
            document.getElementById("maintenance-rate-output").innerHTML = formattedMaintenanceRate;
            document.getElementById("caloric-target-output").innerHTML = formattedCaloricTarget;
            
            document.getElementById("protein-percentage-cell").innerHTML = formattedProteinPercentage;
            document.getElementById("protein-grams-cell").innerHTML = formattedProteinGrams;
            document.getElementById("protein-calories-cell").innerHTML = formattedProteinCalories;
            
            document.getElementById("carbs-percentage-cell").innerHTML = formattedCarbsPercentage;
            document.getElementById("carbs-grams-cell").innerHTML = formattedCarbsGrams;
            document.getElementById("carbs-calories-cell").innerHTML = formattedCarbsCalories;
            
            document.getElementById("fat-percentage-cell").innerHTML = formattedFatPercentage;
            document.getElementById("fat-grams-cell").innerHTML = formattedFatGrams;
            document.getElementById("fat-calories-cell").innerHTML = formattedFatCalories;
            
            document.getElementById("grams-total-cell").innerHTML = formattedTotalGrams;
            document.getElementById("calories-total-cell").innerHTML = formattedTotalCalories;
            
        };
        
        return calculateDiet;
        
    }
    
};