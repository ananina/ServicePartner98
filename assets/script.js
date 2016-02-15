$(document).ready(function(){

    //обработка событий на странице repair
    $('#repair-tab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show')
    });

    $(".date-begin").datepicker({
        format: 'dd.mm.yyyy',
        autoclose: true
    });

    function dateEnd(){
        var dateBegin = $(".dateBegin").val();
        if(dateBegin){
            var date = dateBegin;
        }else{
            var dt = new Date();
            var month = dt.getMonth()+1;
            if (month<10) month='0'+month;
            var day = dt.getDate();
            if (day<10) day='0'+day;
            var year = dt.getFullYear();
            date = day + '.' + month + '.' + year;
        }

        $(".date-end").datepicker({
            format: 'dd.mm.yyyy',
            autoclose: true
        });
        $('.date-end').datepicker('setStartDate', date);
        var dateEnd = $(".dateEnd").val();

        if(dateEnd) {
            if (new Date().getTime(dateBegin) < new Date(dateEnd).getTime()) {
                $('.date-end').datepicker('update', date);
            }
        }
    }

    dateEnd();
    $(".dateBegin").change(function(){
        dateEnd();
    });

    $("select[name=id_client]").val('0');
    $("select[name=id_client]").change(function() {
        var id = $(this).val();
        loadData('one', 'client', 'id_client', id);
    });

    function loadData(count, table, id_name, id){
        $.ajax({
            type: "POST",
            url: "/ServicePartner98/model/ajax.php",
            dataType: 'json',
            data: {count : count, table : table, id_name : id_name, id: id},
            success: function (data) {
                switch (table){
                    case 'client': $('#address_client').val(data['address']);
                                    $('#tel_client').val(data['tel']);
                                    break;
                    case 'material':
                                    for(item in data){
                                        //console.log(data[item]);
                                        var idMaterial = data[item]['id_material'];
                                        var material = data[item]['material'];
                                        $('<option>').attr('value', idMaterial).html(material).appendTo('select.selectMaterial:last');
                                    }
                                    $('select.selectMaterial').selectpicker({
                                        liveSearch: true,
                                        title: 'Выберите материал...'
                                    });

                                    $('select.selectMaterial').on('changed.bs.select', function () {
                                        $(this).parent().parent().parent().find("input[name=materialPrice]").removeAttr('disabled');
                                        $(this).parent().parent().parent().find("input[name=materialCount]").val('1').removeAttr('disabled');
                                    });


                                    /* проверка значения
                                    $('select.selectMaterial').on('changed.bs.select', function (e) {
                                    console.log($(this).val());
                                    });*/
                                    $('.btnAdd').on('click', function(event) {
                                        event.preventDefault();
                                        $('#modalLabel').html('Добавление материала');
                                        $('#modal input[type=submit]').val('Добавить');
                                        $('#modal .table-modal tr').empty();
                                        $('#modal tr').append('<td>Наименование</td>');
                                        $('#modal table').append('<tr><td><div class="form-group"><input type="text" class="form-control" name="material" data-name="add" placeholder="Введите название материала..."></div></td></tr>');
                                        var path = $('#tableMaterials').attr('data-path');
                                        $('#modal').parent().attr('action', path);

                                    });

                                    $("input[name=materialPrice]").on("keyup", function(){
                                        isNumericPrice($(this));
                                    });
                                    $("input[name=materialCount]").on("keyup", function(){
                                        isNumericCount($(this));
                                    });

                                    $("input[name=materialPrice]").on("blur", function(){
                                        var price = (+$(this).val()).toFixed(2);
                                        $(this).val(price);
                                        var count = $(this).parent().parent().find('input[name=materialCount]').val();
                                        if(count != ''){
                                            var summ = ($(this).val() * count).toFixed(2);
                                            $(this).parent().parent().find('input[name=materialSumm]').val(summ);
                                        }else{
                                            $(this).parent().parent().find('input[name=materialSumm]').val('');
                                        }
                                    });
                                    $("input[name=materialCount]").on("blur", function(){
                                        var price = $(this).parent().parent().find('input[name=materialPrice]').val();
                                        if(price != ''){
                                            var summ = ($(this).val() * price).toFixed(2);
                                            $(this).parent().parent().find('input[name=materialSumm]').val(summ);
                                        }else{
                                            $(this).parent().parent().find('input[name=materialSumm]').val('');
                                        }
                                    });
                                    break;
                    case 'work':
                                    var work_price = [];
                                    for(item in data){
                                        var idWork = data[item]['id_work'];
                                        var work = data[item]['work'];
                                        var price = data[item]['price'];
                                        work_price[idWork] = price;
                                        $('<option>').attr('value', idWork).html(work).appendTo('select.selectWork:last');
                                    }
                                    $('select.selectWork').selectpicker({
                                        liveSearch: true,
                                        title: 'Выберите работу...'
                                    });

                                    $('select.selectWork').on('changed.bs.select', function () {
                                        var id = $(this).val();
                                        $(this).parent().parent().parent().find("input[name=workPrice]").val(work_price[id]).removeAttr('disabled');
                                        $(this).parent().parent().parent().find("input[name=workCount]").val('1').removeAttr('disabled');
                                     });

                                    $("input[name=workPrice]").on("keyup", function(){
                                        isNumericPrice($(this));
                                    });
                                    $("input[name=workCount]").on("keyup", function(){
                                        isNumericCount($(this));
                                    });

                                    $("input[name=workPrice]").on("blur", function(){
                                        var price = (+$(this).val()).toFixed(2);
                                        $(this).val(price);
                                        var count = $(this).parent().parent().find('input[name=workCount]').val();
                                        if(count != ''){
                                            var summ = ($(this).val() * count).toFixed(2);
                                            $(this).parent().parent().find('input[name=workSumm]').val(summ);
                                        }else{
                                            $(this).parent().parent().find('input[name=workSumm]').val('');
                                        }
                                    });
                                    $("input[name=workCount]").on("blur", function(){
                                        var price = $(this).parent().parent().find('input[name=workPrice]').val();
                                        if(price != ''){
                                            var summ = ($(this).val() * price).toFixed(2);
                                            $(this).parent().parent().find('input[name=workSumm]').val(summ);
                                        }else{
                                            $(this).parent().parent().find('input[name=workSumm]').val('');
                                        }
                                    });
                                    break;
                }


            }
        });
    }


    //проверка ввода чисел
    function isNumericPrice(elem){
        var str = elem.val();
        if(isNaN(str)){
            str = str.substring(0,str.length-1);
            elem.val(str);
        }else{
            var reg = /\d+(\.\d{3})/;
            if(reg.test(str)){
                str = str.substring(0,str.length-1);
                elem.val(str);
            }
        }
    }
    function isNumericCount(elem){
        var str = elem.val();
        if(isNaN(str)){
            str = str.substring(0,str.length-1);
            elem.val(str);
        }else{
            var reg = /\./;
            if(reg.test(str)){
                str = str.substring(0,str.length-1);
                elem.val(str);
            }

        }
    }


    $("select[name=id_status]").val('1');

    //добавление материалов в новый документ
    $("#btnAddMaterials").click(function(){
        $('<tr>').appendTo('#tableMaterials');
        $('<td>').appendTo('#tableMaterials tr:last');
        $('<select>').attr('class', 'selectMaterial').attr('name', 'material').appendTo('#tableMaterials td:last');
        $('<button>').attr({"data-name":"material", "class":"btn btn-default btnPlus", "data-toggle":"modal", "data-target":"#modal"}).html('<span class="glyphicon glyphicon-plus"></span>').appendTo('#tableMaterials td:last');
        $('<td>').appendTo('#tableMaterials tr:last');
        $('<input>').attr('class', 'form-control count').attr('type', 'text').attr('name', 'materialPrice').attr('disabled', 'disabled').appendTo('#tableMaterials td:last');
        $('<td>').appendTo('#tableMaterials tr:last');
        $('<input>').attr('class', 'form-control count').attr('type', 'text').attr('name', 'materialCount').attr('disabled', 'disabled').appendTo('#tableMaterials td:last');
        $('<td>').appendTo('#tableMaterials tr:last');
        $('<input>').attr('class', 'form-control count').attr('type', 'text').attr('name', 'materialSumm').attr('disabled', 'disabled').appendTo('#tableMaterials td:last');

        $('.btnPlus').on('click', function(event){
            event.preventDefault();
            plus($(this).attr('data-name'));
        });
        loadData('all', 'material');
    });

    //добавление работ в новый документ
    $("#btnAddWorks").click(function(){
        $('<tr>').appendTo('#tableWorks');
        $('<td>').appendTo('#tableWorks tr:last');
        $('<select>').attr('class', 'selectWork').attr('name', 'work').appendTo('#tableWorks td:last');
        $('<button>').attr({"data-name":"work", "class":"btn btn-default btnPlus", "data-toggle":"modal", "data-target":"#modal"}).html('<span class="glyphicon glyphicon-plus"></span>').appendTo('#tableWorks td:last');
        $('<td>').appendTo('#tableWorks tr:last');
        $('<input>').attr('class', 'form-control count').attr('type', 'text').attr('name', 'workPrice').attr('disabled', 'disabled').appendTo('#tableWorks td:last');
        $('<td>').appendTo('#tableWorks tr:last');
        $('<input>').attr('class', 'form-control count').attr('type', 'text').attr('name', 'workCount').attr('disabled', 'disabled').appendTo('#tableWorks td:last');
        $('<td>').appendTo('#tableWorks tr:last');
        $('<input>').attr('class', 'form-control count').attr('type', 'text').attr('name', 'workSumm').attr('disabled', 'disabled').appendTo('#tableWorks td:last');

        $('.btnPlus').on('click', function(event){
            event.preventDefault();
            plus($(this).attr('data-name'));
        });
        loadData('all', 'work');
    });

    //обработка кнопок в справочниках
    $(".btnEdit").click(function(event){
        event.preventDefault();
        var path = $(this).attr('data-path');
        var labels = $(this).parents('.table-main').find('tr:first').children();
        var tableHeader = [];
        $(labels).each(function() {
            if($(this).text()){
                tableHeader.push($(this).text());
            }
        });
        var inputs = $(this).parent().parent().find('input');
        var tableContent = new Object();
        $(inputs).each(function(){
            tableContent[$(this).attr('name')] = $(this).attr('value');
        });
        var modalRemove = new Modal(path, 'Редактирование', 'Сохранить');
        modalRemove.create(tableHeader, tableContent);
    });

    $(".btnRemove").click(function(event) {
        event.preventDefault();
        var path = $(this).attr('data-path');
        var tableHeader = ['Вы уверены, что хотите удалить эту позицию?'];
        var modalRemove = new Modal(path, 'Удаление', 'Удалить');
        modalRemove.create(tableHeader, '');
    });

    $('.btnAdd').click(function(event) {
        var btn = $(this);
        var tr = btn.parent().parent();
        var inputs = tr.find('input:text');
        if(tr.find('input:text:first').val()==''){
            event.preventDefault();
            $(inputs).each(function() {
                $(this).parent().addClass('has-error');
                tr.addClass('danger');
                btn.next().removeAttr('hidden');
            });
        }
    });

    function plus(name){
        console.log(name);
        $('#modal table').empty();
        $('#modal input[type=submit]').val('Сохранить');
        $('#modal table').append('<tr><td>Наименование</td></tr>');
        switch (name){
            case 'material':
                $('#modalLabel').html('Добавление материала');
                $('#modal table').append('<tr><td></td></tr>');
                $('<input>').attr('class', 'form-control').attr('type', 'text').attr('name', name).appendTo('#modal td:last');
                $('#modal input[type=submit]').click(function(event){
                    event.preventDefault();
                    var value = $('#modal input[name=' + name +']').val();
                    console.log(value);
                    if(value){
                        addData('material', {material:value});
                    }
                });
                break;
            case 'work':    $('#modalLabel').html('Добавление работы');
                            $('#modal table tr:first').append('<td>Цена</td>');
                            $('#modal table').append('<tr><td></td></tr>');
                            $('<input>').attr('class', 'form-control').attr('type', 'text').attr('name', name).appendTo('#modal td:last');
                            $('#modal table tr').append('<td>');
                            $('<input>').attr('class', 'form-control').attr('type', 'text').attr('name', 'price').appendTo('#modal td:last');
                            $('#modal input[type=submit]').click(function(event){
                                event.preventDefault();
                                var value = $('#modal input[name=' + name +']').val();
                                var priceValue = $('#modal input[name=price]').val();
                                console.log(value);
                                if(value){
                                    addData('work', {work:value, price:priceValue});
                                }
                            });
                            break;
            }
    }

    $('.btn-cancel').click(function(){
        $('#modal table tr').empty();
    });

    //убирает класс ошибки при заполнении поля в справочниках
    $('input[data-name=add]').keydown(function(){
        var tr = $(this).parent().parent().parent();
        var inputs = tr.find('input:text');
        $(inputs).each(function() {
            $(this).parent().removeClass('has-error');
        });
        tr.removeClass('danger');
        $('.btnAdd').next().attr('hidden', 'hidden');
    });

    $("input[name=price]").on("keyup", function(){
        isNumericPrice($(this));
    });

    $("input[name=tel]").mask("8-999-999-9999");

    $("input[name=date_begin]").mask("99.99.9999",{placeholder:"dd.mm.yyyy"});
    $("input[name=date_end]").mask("99.99.9999",{placeholder:"dd.mm.yyyy"});

    function addData(table, params) {
        console.log(table, params);
        $.ajax({
            type: "POST",
            url: "/ServicePartner98/model/ajax.php",
            dataType: 'json',
            data: {table: table, params: params},
            success: function (data) {

            }
        });
    }

    //класс Modal
    function Modal(path, header, button){
        var path = path;
        var header = header;
        var button = button;
        this.create = function(tableHeader, tableContent){
            $('#modal').parent().attr('action', path);
            $('#modalLabel').html(header);
            $('#modal input:submit').val(button);
            $('#modal .table-modal').empty();
            if(tableHeader){
                $('#modal .table-modal').append('<tr>');
                for(var i = 0; i < tableHeader.length; i++){
                    $('#modal .table-modal tr:last').append($('<td>' + tableHeader[i] + '</td>'));
                }
            }
            if(tableContent){
                $('#modal .table-modal').append('<tr>');
                for(item in tableContent){
                    var value = tableContent[item];
                    $('#modal .table-modal tr:last').append($('<td><input type="text" class="form-control" name=' + item + '></td>'));
                    $('#modal .table-modal input:last').val(value);
                }
            }
            $("input[name=tel]").mask("8-999-999-9999");
            if(header == 'Редактирование')
            for(var i = 1; i <= 3; i++){
                if($('div.panel' + i).length){
                    $('.modal-dialog').addClass('modal' + i);
                }
            }
        }
    }

});
