var CsvToHtmlTable = CsvToHtmlTable || {};

CsvToHtmlTable = {
    init: function (options) {
        options = options || {};

        var gender = document.getElementById(options.gender).value
        var catagory = document.getElementById(options.catagory).value
        var percentile = document.getElementById(options.percentile).value
        var mains_cat_rank = document.getElementById(options.mains_cat_rank).value
        var adv_gen_rank = document.getElementById(options.adv_gen_rank).value
        var adv_cat_rank = document.getElementById(options.adv_cat_rank).value

//        var rank = parseInt((1 - parseFloat(percentile) / 100) * 1560000)
        var rank = parseInt(parseFloat(percentile))
        var low_margin = 0.9
        var high_margin = 1.1
        if (catagory == "OPEN" && mains_cat_rank > 0) {
//            rank = mains_cat_rank
            rank = parseInt(parseFloat(percentile))
        }

        var csv_path = options.csv_path || "";
        var el = options.element || "table-container";
        var allow_download = options.allow_download || false;
        var csv_options = {
            separator: ',',
            delimiter: '"'
        } || {};
        var datatables_options = options.datatables_options || {};
        var custom_formatting = options.custom_formatting || [];
        var customTemplates = {};
        $.each(custom_formatting, function (i, v) {
            var colIdx = v[0];
            var func = v[1];
            customTemplates[colIdx] = func;
        });
        var $table = $("<table class='table table-striped table-condensed' id='" + el + "-table'></table>");
        var $containerElement = $("#" + el);
        $containerElement.empty().append($table);

        $.when($.get(csv_path)).then(
            function (data) {
                var csvData = $.csv.toArrays(data, csv_options);
                var $tableHead = $("<thead></thead>");
                var csvHeaderRow = csvData[0];
                var $tableHeadRow = $("<tr></tr>");
                for (var headerIdx = 0; headerIdx < csvHeaderRow.length; headerIdx++) {
                    $tableHeadRow.append($("<th></th>").text(csvHeaderRow[headerIdx]));
                }
                $tableHead.append($tableHeadRow);

                $table.append($tableHead);
                var $tableBody = $("<tbody></tbody>");
                if (csv_path != "data/JoSAA_IIT_round6.csv") {
                    if ((0 < percentile) || mains_cat_rank > 0) {
                        for (var rowIdx = 1; rowIdx < Math.floor(csvData.length); rowIdx++) {
                            if (csvData[rowIdx][3] == catagory && csvData[rowIdx][3] != "OPEN") {
                                if (mains_cat_rank >= (low_margin) * parseInt(csvData[rowIdx][5]) && mains_cat_rank <= (high_margin) * parseInt(csvData[rowIdx][6])) {
                                    if (gender == csvData[rowIdx][4] || csvData[rowIdx][4] == "Gender-Neutral") {
                                        var $tableBodyRow = $("<tr></tr>");
                                        for (var colIdx = 0; colIdx < csvData[rowIdx].length; colIdx++) {
                                            var $tableBodyRowTd = $("<td></td>");
                                            var cellTemplateFunc = customTemplates[colIdx];
                                            if (cellTemplateFunc) {
                                                $tableBodyRowTd.html(cellTemplateFunc(csvData[rowIdx][colIdx]));
                                            } else {
                                                $tableBodyRowTd.text(csvData[rowIdx][colIdx]);
                                            }
                                            $tableBodyRow.append($tableBodyRowTd);
                                            $tableBody.append($tableBodyRow);
                                        }
                                    }
                                }
                            }
                            if (csvData[rowIdx][3] == "OPEN") {
                                if (rank >= (low_margin) * parseInt(csvData[rowIdx][5]) && rank <= (high_margin) * parseInt(csvData[rowIdx][6])) {
                                    if (gender == csvData[rowIdx][4] || csvData[rowIdx][4] == "Gender-Neutral") {
                                        var $tableBodyRow = $("<tr></tr>");
                                        for (var colIdx = 0; colIdx < csvData[rowIdx].length; colIdx++) {
                                            var $tableBodyRowTd = $("<td></td>");
                                            var cellTemplateFunc = customTemplates[colIdx];
                                            if (cellTemplateFunc) {
                                                $tableBodyRowTd.html(cellTemplateFunc(csvData[rowIdx][colIdx]));
                                            } else {
                                                $tableBodyRowTd.text(csvData[rowIdx][colIdx]);
                                            }
                                            $tableBodyRow.append($tableBodyRowTd);
                                            $tableBody.append($tableBodyRow);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (csv_path == "data/JoSAA_IIT_round6.csv") {

                    if (adv_gen_rank>0 || adv_cat_rank>0) {
                        for (var rowIdx = 1; rowIdx < Math.floor(csvData.length); rowIdx++) {
                            if (csvData[rowIdx][3] == catagory && csvData[rowIdx][3] != "OPEN") {
                                if (adv_cat_rank >= (low_margin) * parseInt(csvData[rowIdx][5]) && adv_cat_rank <= (high_margin) * parseInt(csvData[rowIdx][6])) {
                                    if (gender == csvData[rowIdx][4] || csvData[rowIdx][4] == "Gender-Neutral") {
                                        var $tableBodyRow = $("<tr></tr>");
                                        for (var colIdx = 0; colIdx < csvData[rowIdx].length; colIdx++) {
                                            var $tableBodyRowTd = $("<td></td>");
                                            var cellTemplateFunc = customTemplates[colIdx];
                                            if (cellTemplateFunc) {
                                                $tableBodyRowTd.html(cellTemplateFunc(csvData[rowIdx][colIdx]));
                                            } else {
                                                $tableBodyRowTd.text(csvData[rowIdx][colIdx]);
                                            }
                                            $tableBodyRow.append($tableBodyRowTd);
                                            $tableBody.append($tableBodyRow);
                                        }
                                    }
                                }
                            }
                            if (csvData[rowIdx][3] == "OPEN") {
                                if (adv_gen_rank >= (low_margin) * parseInt(csvData[rowIdx][5]) && adv_gen_rank <= (high_margin) * parseInt(csvData[rowIdx][6])) {
                                    if (gender == csvData[rowIdx][4] || csvData[rowIdx][4] == "Gender-Neutral") {
                                        var $tableBodyRow = $("<tr></tr>");
                                        for (var colIdx = 0; colIdx < csvData[rowIdx].length; colIdx++) {
                                            var $tableBodyRowTd = $("<td></td>");
                                            var cellTemplateFunc = customTemplates[colIdx];
                                            if (cellTemplateFunc) {
                                                $tableBodyRowTd.html(cellTemplateFunc(csvData[rowIdx][colIdx]));
                                            } else {
                                                $tableBodyRowTd.text(csvData[rowIdx][colIdx]);
                                            }
                                            $tableBodyRow.append($tableBodyRowTd);
                                            $tableBody.append($tableBodyRow);
                                        }
                                    }
                                }
                            }
                        }
                    }

                }


                $table.append($tableBody);

                $table.DataTable(datatables_options);

                if (allow_download) {
                    $containerElement.append("<p><a class='btn btn-info' href='" + csv_path + "'><i class='glyphicon glyphicon-download'></i> Download as CSV</a></p>");
                }
            });
    }
};

function run_form() {
    var round = parseInt(document.getElementById('inputRoundSelect').value)
    if(round==6){
        CsvToHtmlTable.init({
            gender: 'inputGenderSelect',
            catagory: 'inputCatagorySelect',
            percentile: 'inputPercentile',
            mains_cat_rank: 'inputMainsCatagoryRank',
            adv_gen_rank: 'inputAdvancedGeneralRank',
            adv_cat_rank: 'inputAdvancedCatagoryRank',
            csv_path: 'data/JoSAA_NIT_round6.csv',
            element: 'table-container1',
            allow_download: true,
            datatables_options: {
                paging: false
            },
        });

        CsvToHtmlTable.init({
            gender: 'inputGenderSelect',
            catagory: 'inputCatagorySelect',
            percentile: 'inputPercentile',
            mains_cat_rank: 'inputMainsCatagoryRank',
            adv_gen_rank: 'inputAdvancedGeneralRank',
            adv_cat_rank: 'inputAdvancedCatagoryRank',
            csv_path: 'data/JoSAA_IIIT_round6.csv',
            element: 'table-container2',
            allow_download: true,
            datatables_options: {
                paging: false
            },
        });

        CsvToHtmlTable.init({
            gender: 'inputGenderSelect',
            catagory: 'inputCatagorySelect',
            percentile: 'inputPercentile',
            mains_cat_rank: 'inputMainsCatagoryRank',
            adv_gen_rank: 'inputAdvancedGeneralRank',
            adv_cat_rank: 'inputAdvancedCatagoryRank',
            csv_path: 'data/JoSAA_govt_round6.csv',
            element: 'table-container3',
            allow_download: true,
            datatables_options: {
                paging: false
            },
        });

        CsvToHtmlTable.init({
            gender: 'inputGenderSelect',
            catagory: 'inputCatagorySelect',
            percentile: 'inputPercentile',
            mains_cat_rank: 'inputMainsCatagoryRank',
            adv_gen_rank: 'inputAdvancedGeneralRank',
            adv_cat_rank: 'inputAdvancedCatagoryRank',
            csv_path: 'data/JoSAA_IIT_round6.csv',
            element: 'table-container4',
            allow_download: true,
            datatables_options: {
                paging: false
            },
        });
        }


    if(round==5){
        CsvToHtmlTable.init({
            gender: 'inputGenderSelect',
            catagory: 'inputCatagorySelect',
            percentile: 'inputPercentile',
            mains_cat_rank: 'inputMainsCatagoryRank',
            adv_gen_rank: 'inputAdvancedGeneralRank',
            adv_cat_rank: 'inputAdvancedCatagoryRank',
            csv_path: 'data/JoSAA_NIT_round5.csv',
            element: 'table-container1',
            allow_download: true,
            datatables_options: {
                paging: false
            },
        });

        CsvToHtmlTable.init({
            gender: 'inputGenderSelect',
            catagory: 'inputCatagorySelect',
            percentile: 'inputPercentile',
            mains_cat_rank: 'inputMainsCatagoryRank',
            adv_gen_rank: 'inputAdvancedGeneralRank',
            adv_cat_rank: 'inputAdvancedCatagoryRank',
            csv_path: 'data/JoSAA_IIIT_round5.csv',
            element: 'table-container2',
            allow_download: true,
            datatables_options: {
                paging: false
            },
        });

        CsvToHtmlTable.init({
            gender: 'inputGenderSelect',
            catagory: 'inputCatagorySelect',
            percentile: 'inputPercentile',
            mains_cat_rank: 'inputMainsCatagoryRank',
            adv_gen_rank: 'inputAdvancedGeneralRank',
            adv_cat_rank: 'inputAdvancedCatagoryRank',
            csv_path: 'data/JoSAA_govt_round5.csv',
            element: 'table-container3',
            allow_download: true,
            datatables_options: {
                paging: false
            },
        });

        CsvToHtmlTable.init({
            gender: 'inputGenderSelect',
            catagory: 'inputCatagorySelect',
            percentile: 'inputPercentile',
            mains_cat_rank: 'inputMainsCatagoryRank',
            adv_gen_rank: 'inputAdvancedGeneralRank',
            adv_cat_rank: 'inputAdvancedCatagoryRank',
            csv_path: 'data/JoSAA_IIT_round5.csv',
            element: 'table-container4',
            allow_download: true,
            datatables_options: {
                paging: false
            },
        });
        }


    if(round==4){
        CsvToHtmlTable.init({
            gender: 'inputGenderSelect',
            catagory: 'inputCatagorySelect',
            percentile: 'inputPercentile',
            mains_cat_rank: 'inputMainsCatagoryRank',
            adv_gen_rank: 'inputAdvancedGeneralRank',
            adv_cat_rank: 'inputAdvancedCatagoryRank',
            csv_path: 'data/JoSAA_NIT_round4.csv',
            element: 'table-container1',
            allow_download: true,
            datatables_options: {
                paging: false
            },
        });

        CsvToHtmlTable.init({
            gender: 'inputGenderSelect',
            catagory: 'inputCatagorySelect',
            percentile: 'inputPercentile',
            mains_cat_rank: 'inputMainsCatagoryRank',
            adv_gen_rank: 'inputAdvancedGeneralRank',
            adv_cat_rank: 'inputAdvancedCatagoryRank',
            csv_path: 'data/JoSAA_IIIT_round4.csv',
            element: 'table-container2',
            allow_download: true,
            datatables_options: {
                paging: false
            },
        });

        CsvToHtmlTable.init({
            gender: 'inputGenderSelect',
            catagory: 'inputCatagorySelect',
            percentile: 'inputPercentile',
            mains_cat_rank: 'inputMainsCatagoryRank',
            adv_gen_rank: 'inputAdvancedGeneralRank',
            adv_cat_rank: 'inputAdvancedCatagoryRank',
            csv_path: 'data/JoSAA_govt_round4.csv',
            element: 'table-container3',
            allow_download: true,
            datatables_options: {
                paging: false
            },
        });

        CsvToHtmlTable.init({
            gender: 'inputGenderSelect',
            catagory: 'inputCatagorySelect',
            percentile: 'inputPercentile',
            mains_cat_rank: 'inputMainsCatagoryRank',
            adv_gen_rank: 'inputAdvancedGeneralRank',
            adv_cat_rank: 'inputAdvancedCatagoryRank',
            csv_path: 'data/JoSAA_IIT_round4.csv',
            element: 'table-container4',
            allow_download: true,
            datatables_options: {
                paging: false
            },
        });
        }


    if(round==3){
        CsvToHtmlTable.init({
            gender: 'inputGenderSelect',
            catagory: 'inputCatagorySelect',
            percentile: 'inputPercentile',
            mains_cat_rank: 'inputMainsCatagoryRank',
            adv_gen_rank: 'inputAdvancedGeneralRank',
            adv_cat_rank: 'inputAdvancedCatagoryRank',
            csv_path: 'data/JoSAA_NIT_round3.csv',
            element: 'table-container1',
            allow_download: true,
            datatables_options: {
                paging: false
            },
        });

        CsvToHtmlTable.init({
            gender: 'inputGenderSelect',
            catagory: 'inputCatagorySelect',
            percentile: 'inputPercentile',
            mains_cat_rank: 'inputMainsCatagoryRank',
            adv_gen_rank: 'inputAdvancedGeneralRank',
            adv_cat_rank: 'inputAdvancedCatagoryRank',
            csv_path: 'data/JoSAA_IIIT_round3.csv',
            element: 'table-container2',
            allow_download: true,
            datatables_options: {
                paging: false
            },
        });

        CsvToHtmlTable.init({
            gender: 'inputGenderSelect',
            catagory: 'inputCatagorySelect',
            percentile: 'inputPercentile',
            mains_cat_rank: 'inputMainsCatagoryRank',
            adv_gen_rank: 'inputAdvancedGeneralRank',
            adv_cat_rank: 'inputAdvancedCatagoryRank',
            csv_path: 'data/JoSAA_govt_round3.csv',
            element: 'table-container3',
            allow_download: true,
            datatables_options: {
                paging: false
            },
        });

        CsvToHtmlTable.init({
            gender: 'inputGenderSelect',
            catagory: 'inputCatagorySelect',
            percentile: 'inputPercentile',
            mains_cat_rank: 'inputMainsCatagoryRank',
            adv_gen_rank: 'inputAdvancedGeneralRank',
            adv_cat_rank: 'inputAdvancedCatagoryRank',
            csv_path: 'data/JoSAA_IIT_round3.csv',
            element: 'table-container4',
            allow_download: true,
            datatables_options: {
                paging: false
            },
        });
        }


    if(round==2){
        CsvToHtmlTable.init({
            gender: 'inputGenderSelect',
            catagory: 'inputCatagorySelect',
            percentile: 'inputPercentile',
            mains_cat_rank: 'inputMainsCatagoryRank',
            adv_gen_rank: 'inputAdvancedGeneralRank',
            adv_cat_rank: 'inputAdvancedCatagoryRank',
            csv_path: 'data/JoSAA_NIT_round2.csv',
            element: 'table-container1',
            allow_download: true,
            datatables_options: {
                paging: false
            },
        });

        CsvToHtmlTable.init({
            gender: 'inputGenderSelect',
            catagory: 'inputCatagorySelect',
            percentile: 'inputPercentile',
            mains_cat_rank: 'inputMainsCatagoryRank',
            adv_gen_rank: 'inputAdvancedGeneralRank',
            adv_cat_rank: 'inputAdvancedCatagoryRank',
            csv_path: 'data/JoSAA_IIIT_round2.csv',
            element: 'table-container2',
            allow_download: true,
            datatables_options: {
                paging: false
            },
        });

        CsvToHtmlTable.init({
            gender: 'inputGenderSelect',
            catagory: 'inputCatagorySelect',
            percentile: 'inputPercentile',
            mains_cat_rank: 'inputMainsCatagoryRank',
            adv_gen_rank: 'inputAdvancedGeneralRank',
            adv_cat_rank: 'inputAdvancedCatagoryRank',
            csv_path: 'data/JoSAA_govt_round2.csv',
            element: 'table-container3',
            allow_download: true,
            datatables_options: {
                paging: false
            },
        });

        CsvToHtmlTable.init({
            gender: 'inputGenderSelect',
            catagory: 'inputCatagorySelect',
            percentile: 'inputPercentile',
            mains_cat_rank: 'inputMainsCatagoryRank',
            adv_gen_rank: 'inputAdvancedGeneralRank',
            adv_cat_rank: 'inputAdvancedCatagoryRank',
            csv_path: 'data/JoSAA_IIT_round2.csv',
            element: 'table-container4',
            allow_download: true,
            datatables_options: {
                paging: false
            },
        });
        }


    if(round==1){
        CsvToHtmlTable.init({
            gender: 'inputGenderSelect',
            catagory: 'inputCatagorySelect',
            percentile: 'inputPercentile',
            mains_cat_rank: 'inputMainsCatagoryRank',
            adv_gen_rank: 'inputAdvancedGeneralRank',
            adv_cat_rank: 'inputAdvancedCatagoryRank',
            csv_path: 'data/JoSAA_NIT_round1.csv',
            element: 'table-container1',
            allow_download: true,
            datatables_options: {
                paging: false
            },
        });

        CsvToHtmlTable.init({
            gender: 'inputGenderSelect',
            catagory: 'inputCatagorySelect',
            percentile: 'inputPercentile',
            mains_cat_rank: 'inputMainsCatagoryRank',
            adv_gen_rank: 'inputAdvancedGeneralRank',
            adv_cat_rank: 'inputAdvancedCatagoryRank',
            csv_path: 'data/JoSAA_IIIT_round1.csv',
            element: 'table-container2',
            allow_download: true,
            datatables_options: {
                paging: false
            },
        });

        CsvToHtmlTable.init({
            gender: 'inputGenderSelect',
            catagory: 'inputCatagorySelect',
            percentile: 'inputPercentile',
            mains_cat_rank: 'inputMainsCatagoryRank',
            adv_gen_rank: 'inputAdvancedGeneralRank',
            adv_cat_rank: 'inputAdvancedCatagoryRank',
            csv_path: 'data/JoSAA_govt_round1.csv',
            element: 'table-container3',
            allow_download: true,
            datatables_options: {
                paging: false
            },
        });

        CsvToHtmlTable.init({
            gender: 'inputGenderSelect',
            catagory: 'inputCatagorySelect',
            percentile: 'inputPercentile',
            mains_cat_rank: 'inputMainsCatagoryRank',
            adv_gen_rank: 'inputAdvancedGeneralRank',
            adv_cat_rank: 'inputAdvancedCatagoryRank',
            csv_path: 'data/JoSAA_IIT_round1.csv',
            element: 'table-container4',
            allow_download: true,
            datatables_options: {
                paging: false
            },
        });
        }

}
