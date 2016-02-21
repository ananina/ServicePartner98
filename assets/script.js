$(document).ready(function(){

    //навигационная панель:
    $('.navbar-nav li').mouseenter(function(){
        $(this).addClass('active');
    });
    $('.navbar-nav li').mouseleave(function(){
        $(this).removeClass('active');
    });

    //обработка событий на странице repair
    $('#repair-tab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show')
    });

    //инициализация заполнения календаря
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

    //выбор клиента из списка
    $("select[name=id_client]").val('0');
    $("select[name=id_client]").change(function() {
        var id = $(this).val();
        loadData('one', 'client', 'id_client', id);
    });

    //Ajax-запрос из базы данных
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
                                        $('<option>').attr('value', idMaterial).html(material).appendTo('select.material:last');
                                    }
                                    $('select.material').selectpicker({
                                        liveSearch: true,
                                        title: 'Выберите материал...',
                                        size: 5
                                    });

                                    $('select.material').on('changed.bs.select', function () {
                                        $(this).parent().parent().parent().find("input[name=materialPrice]").removeAttr('disabled');
                                        $(this).parent().parent().parent().find("input[name=materialCount]").val('1').removeAttr('disabled');
                                        $(this).closest('tr').addClass('action');
                                        summa(table, $('#tableMaterials'));
                                    });


                                    /* проверка значения
                                    $('select.material').on('changed.bs.select', function (e) {
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
                                        $(this).closest('tr').addClass('action');
                                        summa(table, $('#tableMaterials'));
                                    });
                                    $("input[name=materialCount]").on("blur", function(){
                                        $(this).closest('tr').addClass('action');
                                        summa(table, $('#tableMaterials'));
                                    });
                                    break;
                    case 'work':
                                    var work_price = [];
                                    for(item in data){
                                        var idWork = data[item]['id_work'];
                                        var work = data[item]['work'];
                                        var price = data[item]['price'];
                                        work_price[idWork] = price;
                                        $('<option>').attr('value', idWork).html(work).appendTo('select.work:last');
                                    }
                                    $('select.work').selectpicker({
                                        liveSearch: true,
                                        title: 'Выберите работу...',
                                        size: 5
                                    });

                                    $('select.work').on('changed.bs.select', function () {
                                        var id = $(this).val();
                                        $(this).parent().parent().parent().find("input[name=workPrice]").val(work_price[id]).removeAttr('disabled');
                                        $(this).parent().parent().parent().find("input[name=workCount]").val('1').removeAttr('disabled');
                                        $(this).closest('tr').addClass('action');
                                        summa(table, $('#tableWorks'));
                                    });

                                    $("input[name=workPrice]").on("keyup", function(){
                                        isNumericPrice($(this));
                                    });
                                    $("input[name=workCount]").on("keyup", function(){
                                        isNumericCount($(this));
                                    });

                                    $("input[name=workPrice]").on("blur", function(){
                                        $(this).closest('tr').addClass('action');
                                        summa(table, $('#tableWorks'));
                                    });
                                    $("input[name=workCount]").on("blur", function(){
                                        $(this).closest('tr').addClass('action');
                                        summa(table, $('#tableWorks'));
                                    });
                                    break;
                }
            }
        });
    }

    //сумма материалов и работ
    function summa(name, table){
        var price = $('tr.action').find('input[name=' + name + 'Price]').val();
        var count = $('tr.action').find('input[name=' + name + 'Count]').val();
        if(price && count){
            var summ = (price * count).toFixed(2);
        }else{
            summ = 0;
        }
        $('tr.action').find('input[name=' + name + 'Summ]').val(summ);
        var total = 0;
        $(table.find('input[name=' + name + 'Summ]')).each(function(){
            total += +$(this).val();
        });
        $('p.' + name).text('Итого: ' + total + 'руб.');
        $('tr.action').removeClass('action');
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

    //живой поиск по спискам в документе
    $('select.select').selectpicker({
        liveSearch: true,
        title: 'Выберите...',
        width: '250px',
        size: 6
    });

    //выбор статуса по-умолчанию
    $('select[name=id_status]').val('1');
    $('select[name=id_status]').selectpicker('refresh');

    //выбор подразделения по-умолчанию
    $('select[name=id_location]').val('1');
    $('select[name=id_location]').selectpicker('refresh');


    //добавление материалов в новый документ
    $("#btnAddMaterials").click(function(){
        $('<tr>').appendTo('#tableMaterials');
        $('<td>').appendTo('#tableMaterials tr:last');
        $('<button>').attr({"data-name":"material", "class":"btn btn-default btnRemove"}).html('<span class="glyphicon glyphicon-remove"></span>').appendTo('#tableMaterials td:last');
        $('<select>').attr('class', 'material').attr('name', 'material').appendTo('#tableMaterials td:last');
        $('<button>').attr({"data-name":"material", "class":"btn btn-default btnPlus", "data-toggle":"modal", "data-target":"#modal"}).html('<span class="glyphicon glyphicon-plus"></span>').appendTo('#tableMaterials td:last');
        $('<td>').appendTo('#tableMaterials tr:last');
        $('<input>').attr('class', 'form-control count').attr('type', 'text').attr('name', 'materialPrice').attr('disabled', 'disabled').appendTo('#tableMaterials td:last');
        $('<td>').appendTo('#tableMaterials tr:last');
        $('<input>').attr('class', 'form-control count').attr('type', 'text').attr('name', 'materialCount').attr('disabled', 'disabled').appendTo('#tableMaterials td:last');
        $('<td>').appendTo('#tableMaterials tr:last');
        $('<input>').attr('class', 'form-control count').attr('type', 'text').attr('name', 'materialSumm').attr('disabled', 'disabled').appendTo('#tableMaterials td:last');
        //нажатие кнопки Плюс в документе
        $('.btnPlus').on('click', function(event){
            event.preventDefault();
            $(this).prev().find('select').addClass('action');
            plus($(this).attr('data-name'));
        });
        //нажатие кнопки Удалить строку в документе
        $('.btnRemove').on('click', function(event){
            event.preventDefault();
            $(this).parent().parent().remove();
            summa('material', $('#tableMaterials'));
        });
        loadData('all', 'material');
    });

    //добавление работ в новый документ
    $("#btnAddWorks").click(function(){
        $('<tr>').appendTo('#tableWorks');
        $('<td>').appendTo('#tableWorks tr:last');
        $('<button>').attr({"data-name":"work", "class":"btn btn-default btnRemove"}).html('<span class="glyphicon glyphicon-remove"></span>').appendTo('#tableWorks td:last');
        $('<select>').attr('class', 'work').attr('name', 'work').appendTo('#tableWorks td:last');
        $('<button>').attr({"data-name":"work", "class":"btn btn-default btnPlus", "data-toggle":"modal", "data-target":"#modal"}).html('<span class="glyphicon glyphicon-plus"></span>').appendTo('#tableWorks td:last');
        $('<td>').appendTo('#tableWorks tr:last');
        $('<input>').attr('class', 'form-control count').attr('type', 'text').attr('name', 'workPrice').attr('disabled', 'disabled').appendTo('#tableWorks td:last');
        $('<td>').appendTo('#tableWorks tr:last');
        $('<input>').attr('class', 'form-control count').attr('type', 'text').attr('name', 'workCount').attr('disabled', 'disabled').appendTo('#tableWorks td:last');
        $('<td>').appendTo('#tableWorks tr:last');
        $('<input>').attr('class', 'form-control count').attr('type', 'text').attr('name', 'workSumm').attr('disabled', 'disabled').appendTo('#tableWorks td:last');
        //нажатие кнопки Плюс в документе
        $('.btnPlus').on('click', function(event){
            event.preventDefault();
            $(this).prev().find('select').addClass('action');
            plus($(this).attr('data-name'));
        });
        //нажатие кнопки Удалить строку в документе
        $('.btnRemove').on('click', function(event){
            event.preventDefault();
            $(this).parent().parent().remove();
            summa('work', $('#tableWorks'));
        });
        loadData('all', 'work');
    });

    //обработка нажатия кнопки Плюс в документе
    function plus(name){
        switch (name) {
            case 'material':
                var modalPlus = new Modal('', 'Добавление материала', 'Сохранить');
                modalPlus.createTable(['Наименование'], {material: ''});
                break;
            case 'work':
                var modalPlus = new Modal('', 'Добавление работы', 'Сохранить');
                modalPlus.createTable(['Наименование', 'Цена'], {work: '', 'price': ''});
                break;
            case 'client':
                var modalPlus = new Modal('', 'Добавление клиента', 'Сохранить');
                modalPlus.createTable(['Наименование', 'Адрес', 'Телефон'], {client: '', 'address': '', tel:''});
                break;
            case 'type':
                var modalPlus = new Modal('', 'Добавление типа устройства', 'Сохранить');
                modalPlus.createTable(['Наименование'], {type: ''});
                break;
            case 'brend':
                var modalPlus = new Modal('', 'Добавление производителя', 'Сохранить');
                modalPlus.createTable(['Наименование'], {brend: ''});
                break;
        }
        modalPlus.changeButton(name);
    }

    //обработка кнопок в справочниках
    //обработка кнопки Редактировать (модальное окно)
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
        modalRemove.createTable(tableHeader, tableContent);
    });
    //обработка кнопки Удалить (модальное окно)
    $(".btnRemove").click(function(event) {
        event.preventDefault();
        var path = $(this).attr('data-path');
        var tableHeader = ['Вы уверены, что хотите удалить эту позицию?'];
        var modalRemove = new Modal(path, 'Удаление', 'Удалить');
        modalRemove.createTable(tableHeader, '');
    });
    //обработка кнопки Добавить
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

    //класс Modal
    function Modal(path, header, button){
        var path = path;
        var header = header;
        var button = button;
        this.createTable = function(tableHeader, tableContent){
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

            //маска ввода номера телефона
            $("input[name=tel]").mask("8-999-999-9999");

            //ширина модального окна в зависимости от количества столбцов
            for(var i = 1; i < 4; i++){
                $('.modal-dialog').removeClass('modal' + i); //очистка старого значения
            }
            var len = tableHeader.length;
            if(len > 0){
                $('.modal-dialog').addClass('modal' + len);
            }

            //добавление класса кнопки Сохранить и выполнение добавления в базу при нажатии на кнопку
            this.changeButton = function(table){
                $('#modal input:submit').addClass('btnSave');
                $('#modal .btnSave').click(function(event){
                    event.preventDefault();
                    var inputs = $('#modal .table-modal tr:last input:text');
                    var params = new Object();
                    var validate = false;
                    $(inputs).each(function(){
                        var key = $(this).attr('name');
                        var value = $(this).val();
                        if(value){
                            params[key] = value;
                            validate = true;
                        }else{
                            validate = false;
                            return false;
                        }

                    });
                    if(validate){
                        addData(table, params);
                        $('#modal').modal('hide');
                    }
                });
            }
        };
    }

    //Ajax-запрос на добавление в базу данных
    function addData(table, params) {
        $.ajax({
            type: "POST",
            url: "/ServicePartner98/model/ajax.php",
            dataType: 'json',
            data: {table: table, params: params},
            success: function (id) {
                //выбор в селект только что добавленной позиции
                $('select.' + table).append(('<option value=' + id + '>' + params[table] + '</option>'));
                $('select.' + table).selectpicker('refresh');
                $('select.action').selectpicker('val', id);
                $('select.action').parent().parent().parent().find('input[name=' + table + 'Price]').val(params['price']).removeAttr('disabled');
                $('select.action').parent().parent().parent().find('input[name=' + table + 'Count]').val('1').removeAttr('disabled');
                $('select.action').parent().parent().parent().find('#address_' + table).val(params['address']);
                $('select.action').parent().parent().parent().find('#tel_' + table).val(params['tel']);
                summa(table, ($('select.action').closest('tr')));
                $('select.action').removeClass('action');

            }
        });
    }
});
