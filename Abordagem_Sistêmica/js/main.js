$(document).ready(function() {
    const variables = ["A", "B", "C"];
    const levels = ["+", "-"];
    var num_experiment = levels.length**variables.length;

    console.log(num_experiment);

    const experiments = [   new Experiment(1, [-1, -1, -1], [750, 950]), 
                            new Experiment(2, [+1, -1, -1], [250, 750, 675]),
                            new Experiment(3, [-1, +1, -1], [1000, 1000]),
                            new Experiment(4, [+1, +1, -1], [900, 875]),
                            new Experiment(5, [-1, -1, +1], [725, 700]),
                            new Experiment(6, [+1, -1, +1], [450, 550, 400]),
                            new Experiment(7, [-1, +1, +1], [1050, 1150]),
                            new Experiment(8, [+1, +1, +1], [875, 900])
                        ];

    var effect = (effects(experiments));
    var simpleVariance = (simple_variance(experiments));
    var globalVariance = (global_variance(simpleVariance, experiments));
    var experimentalError = (experimental_error(globalVariance, experiments));
    var significanceTest = (significance_test(2.228, effect, experimentalError));
    
    console.log(experiments, effects, simpleVariance, globalVariance, experimentalError, significanceTest);
});

class Experiment {
    constructor(number, sequences, results) {
        this.number = number;

        this.sequences = sequences;

        this.results = results;

        this.resultsAverage = results.reduce((sum, value) => 
                                (sum + value))/this.results.length;

        this.resultsQnt = results.length;
    }
}

function simple_variance(Exp) {
    var S_num = [];

    for (let i = 0; i < Exp.length; i++) {
        S_num[i] = Exp[i].results.reduce((sum, value) => sum + (value - Exp[i].resultsAverage)**2, 0) / (Exp[i].results.length - 1);
    }

    return S_num;
}

function global_variance(S_num, Exp) {
    let Sp1;

    Sp1 = S_num.reduce((sum, value, index) => sum + ((Exp[index].resultsQnt - 1) * value), 0) / Exp.reduce((sum, value) => sum + (value.resultsQnt - 1), 0);

    return Sp1;
}

function experimental_error(Sp1) {
    return Math.sqrt(Sp1);
}

function significance_test(criticT, effect, Sp) {
    let T = new Object();

    for (value in effect) {
        if (effect[value]/Sp >= criticT) {
            T = { [value]: effect[value]/Sp };
        }
    }

    return T;
}

function effects(exps) {
    var A_positive = 0;
    var A_negative = 0;

    var B_positive = 0;
    var B_negative = 0;

    var C_positive = 0;
    var C_negative = 0

    var AB_positive = 0;
    var AB_negative = 0;

    var AC_positive = 0;
    var AC_negative = 0;

    var BC_positive = 0;
    var BC_negative = 0;

    var ABC_positive = 0;
    var ABC_negative = 0;

    for (let i = 0; i < exps.length; i++) {

        //Single Variables Effects

        //Variable A Effect
       if (Math.sign(exps[i].sequences[0]) === -1) {
            A_negative += exps[i].resultsAverage;
        } else {
            A_positive += exps[i].resultsAverage; 
        }

        //Variable B Effect
        if (Math.sign(exps[i].sequences[1]) === -1) {
            B_negative += exps[i].resultsAverage;
        } else {
            B_positive += exps[i].resultsAverage; 
        }

        //Variable C Effect
        if (Math.sign(exps[i].sequences[2]) === -1) {
            C_negative += exps[i].resultsAverage;
        } else {
            C_positive += exps[i].resultsAverage; 
        }

        //Variables Interation Effects

        //Variable AB Effect
        if (Math.sign(exps[i].sequences[0] * exps[i].sequences[1]) === -1) {
            AB_negative += exps[i].resultsAverage;
        } else {
            AB_positive += exps[i].resultsAverage; 
        }
        
        //Variable AC Effect
        if (Math.sign(exps[i].sequences[0]*exps[i].sequences[2]) === -1) {
            AC_negative += exps[i].resultsAverage;
        } else {
            AC_positive += exps[i].resultsAverage; 
        }

        //Variable BC Effect
        if (Math.sign(exps[i].sequences[1] * exps[i].sequences[2]) === -1) {
            BC_negative += exps[i].resultsAverage;
        } else {
            BC_positive += exps[i].resultsAverage; 
        }

        //Variable ABC Effect
        if (Math.sign(exps[i].sequences[0] * exps[i].sequences[1] * exps[i].sequences[2]) === -1) {
            ABC_negative += exps[i].resultsAverage;
        } else {
            ABC_positive += exps[i].resultsAverage; 
        }
    }

    const effectsResults = {
        E_a: A_positive/4 - A_negative/4,
        E_b: B_positive/4 - B_negative/4,
        E_c: C_positive/4 - C_negative/4,
        E_ab: AB_positive/4 - AB_negative/4,
        E_ac: AC_positive/4 - AC_negative/4,
        E_bc: BC_positive/4 - BC_negative/4,
        E_abc: ABC_positive/4 - ABC_negative/4
    }


    return (effectsResults);
}

