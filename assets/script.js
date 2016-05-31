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
            async: false,
            dataType: 'json',
            data: {count : count, table : table, id_name : id_name, id: id},
            success: function (data) {
                switch (table) {
                    case 'client':
                        $('#address_client').val(data['address']);
                        $('#tel_client').val(data['tel']);
                        break;
                    case 'material':
                        for (item in data) {
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
                            $(this).parent().parent().parent().find("input[name=price]").removeAttr('disabled');
                            $(this).parent().parent().parent().find("input[name=count]").val('1').removeAttr('disabled');
                            $(this).closest('tr').addClass('action');
                            summa(table, $('#tableMaterials'));
                        });


                        /* проверка значения
                         $('select.material').on('changed.bs.select', function (e) {
                         console.log($(this).val());
                         });*/
                        $('.btnAdd').on('click', function (event) {
                            event.preventDefault();
                            $('#modalLabel').html('Добавление материала');
                            $('#modal input[type=submit]').val('Добавить');
                            $('#modal .table-modal tr').empty();
                            $('#modal tr').append('<td>Наименование</td>');
                            $('#modal table').append('<tr><td><div class="form-group"><input type="text" class="form-control" name="material" data-name="add" placeholder="Введите название материала..."></div></td></tr>');
                            var path = $('#tableMaterials').attr('data-path');
                            $('#modal').parent().attr('action', path);

                        });

                        $("input[name=price]").on("keyup", function () {
                            isNumeric($(this));
                        });
                        $("input[name=count]").on("keyup", function () {
                            isInteger($(this));
                        });

                        $("input[name=price]").on("blur", function () {
                            $(this).closest('tr').addClass('action');
                            summa(table, $('#tableMaterials'));
                        });
                        $("input[name=count]").on("blur", function () {
                            $(this).closest('tr').addClass('action');
                            summa(table, $('#tableMaterials'));
                        });
                        break;
                    case 'work':
                        var work_price = [];
                        for (item in data) {
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
                            $(this).parent().parent().parent().find("input[name=price]").val(work_price[id]).removeAttr('disabled');
                            $(this).parent().parent().parent().find("input[name=count]").val('1').removeAttr('disabled');
                            $(this).closest('tr').addClass('action');
                            summa(table, $('#tableWorks'));
                        });

                        $("input[name=price]").on("keyup", function () {
                            isNumeric($(this));
                        });
                        $("input[name=count]").on("keyup", function () {
                            isInteger($(this));
                        });

                        $("input[name=price]").on("blur", function () {
                            $(this).closest('tr').addClass('action');
                            summa(table, $('#tableWorks'));
                        });
                        $("input[name=count]").on("blur", function () {
                            $(this).closest('tr').addClass('action');
                            summa(table, $('#tableWorks'));
                        });
                        break;
                    case 'repair':
                        $('input[name=date_begin]').val(data['date_begin']);
                        $('input[name=number]').val(data['number']);
                        $('select[name=id_client]').val(data['id_client']);
                        $('select[name=id_client]').selectpicker('refresh');
                        loadData('one', 'client', 'id_client', data['id_client']);
                        $('input[name=date_status]').val(data['date_status']);
                        $('select[name=id_status]').val(data['id_status']);
                        $('select[name=id_status]').selectpicker('refresh');
                        $('textarea[name=problem]').val(data['problem']);
                        $('textarea[name=comment]').val(data['comment']);
                        $("select[name=id_type]").val(data['id_type']);
                        $('select[name=id_type]').selectpicker('refresh');
                        $("select[name=id_brend]").val(data['id_brend']);
                        $('select[name=id_brend]').selectpicker('refresh');
                        $('input[name=model]').val(data['model']);
                        $('input[name=serial_number]').val(data['serial_number']);
                        $('input[name=lot_number]').val(data['lot_number']);
                        $('input[name=motor]').val(data['motor']);
                        $('input[name=U]').val(data['U']);
                        $('input[name=I]').val(data['I']);
                        $('input[name=W]').val(data['W']);
                        $('input[name=garant]').val(data['garant']);
                        $("select[name=id_user]").val(data['id_user']);
                        $('select[name=id_user]').selectpicker('refresh');
                        $("select[name=id_location]").val(data['id_location']);
                        $('select[name=id_location]').selectpicker('refresh');
                        $('input[name=date_end]').val(data['date_end']);
                        loadData('many', 'number_materials', 'id', data['id']);
                        loadData('many', 'number_works', 'id', data['id']);
                        break;
                    case 'number_materials':
                        for (item in data) {
                            loadMaterials();
                        }
                        var i = 0;
                        $('#tableMaterials tbody tr').each(function(){
                            $(this).find('select[name=id_material]').attr('data-id', data[i]['idIndex']).val(data[i]['id_material']);
                            $(this).find('select[name=id_material]').selectpicker('refresh');
                            $(this).find('input[name=count]').val(data[i]['count']).removeAttr('disabled');
                            $(this).find('input[name=price]').val(data[i]['price']).removeAttr('disabled');
                            $(this).find('input[name=summ]').val(data[i]['summ']).addClass('action');
                            i++;
                        });
                        summa('material', $('#tableMaterials'));
                        break;
                    case 'number_works':
                        for (item in data) {
                            loadWorks();
                        }
                        var i = 0;
                        $('#tableWorks tbody tr').each(function(){
                            $(this).find('select[name=id_work]').attr('data-id', data[i]['idIndex']).val(data[i]['id_work']);
                            $(this).find('select[name=id_work]').selectpicker('refresh');
                            $(this).find('input[name=count]').val(data[i]['count']).removeAttr('disabled');
                            $(this).find('input[name=price]').val(data[i]['price']).removeAttr('disabled');
                            $(this).find('input[name=summ]').val(data[i]['summ']).addClass('action');
                            i++;
                        });
                        summa('work', $('#tableWorks'));
                        break;
                }
            }
        });
    }


    //сумма материалов и работ
    function summa(name, table){
        var price = $('tr.action').find('input[name=price]').val();
        var count = $('tr.action').find('input[name=count]').val();
        if(price && count){
            var summ = (price * count).toFixed(2);
        }else{
            summ = 0;
        }
        $('tr.action').find('input[name=summ]').val(summ);
        var total = 0;
        $(table.find('input[name=summ]')).each(function(){
            total += +$(this).val();
        });
        $('p.' + name).text('Итого: ' + total + 'руб.');
        $('tr.action').removeClass('action');
    }

    //проверка ввода чисел
    function isNumeric(elem){
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
    function isInteger(elem){
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

    //Функция загрузки материалов в документ
    function loadMaterials(){
        $('<tr>').appendTo('#tableMaterials');
        $('<td>').appendTo('#tableMaterials tr:last');
        $('<button>').attr({"data-name":"material", "class":"btn btn-default btnRemove", "title":"Удалить"}).html('<span class="glyphicon glyphicon-remove"></span>').appendTo('#tableMaterials td:last');
        $('<select>').attr('class', 'material').attr('name', 'id_material').appendTo('#tableMaterials td:last');
        $('<button>').attr({"data-name":"material", "class":"btn btn-default btnPlus", "title":"Добавить", "data-toggle":"modal", "data-target":"#modal"}).html('<span class="glyphicon glyphicon-plus"></span>').appendTo('#tableMaterials td:last');
        $('<td>').appendTo('#tableMaterials tr:last');
        $('<input>').attr('class', 'form-control count').attr('type', 'text').attr('name', 'price').attr('disabled', 'disabled').appendTo('#tableMaterials td:last');
        $('<td>').appendTo('#tableMaterials tr:last');
        $('<input>').attr('class', 'form-control count').attr('type', 'text').attr('name', 'count').attr('disabled', 'disabled').appendTo('#tableMaterials td:last');
        $('<td>').appendTo('#tableMaterials tr:last');
        $('<input>').attr('class', 'form-control count').attr('type', 'text').attr('name', 'summ').attr('disabled', 'disabled').appendTo('#tableMaterials td:last');

        //нажатие кнопки Удалить строку в документе
        $('.btnRemove').on('click', function(event){
            event.preventDefault();
            $(this).parent().parent().remove();
            summa('material', $('#tableMaterials'));
        });
        loadData('all', 'material');
    }

    //Функция загрузки работ в документ
    function loadWorks(){
        $('<tr>').appendTo('#tableWorks');
        $('<td>').appendTo('#tableWorks tr:last');
        $('<button>').attr({"data-name":"work", "class":"btn btn-default btnRemove", "title":"Удалить"}).html('<span class="glyphicon glyphicon-remove"></span>').appendTo('#tableWorks td:last');
        $('<select>').attr('class', 'work').attr('name', 'id_work').appendTo('#tableWorks td:last');
        $('<button>').attr({"data-name":"work", "class":"btn btn-default btnPlus", "title":"Добавить", "data-toggle":"modal", "data-target":"#modal"}).html('<span class="glyphicon glyphicon-plus"></span>').appendTo('#tableWorks td:last');
        $('<td>').appendTo('#tableWorks tr:last');
        $('<input>').attr('class', 'form-control count').attr('type', 'text').attr('name', 'price').attr('disabled', 'disabled').appendTo('#tableWorks td:last');
        $('<td>').appendTo('#tableWorks tr:last');
        $('<input>').attr('class', 'form-control count').attr('type', 'text').attr('name', 'count').attr('disabled', 'disabled').appendTo('#tableWorks td:last');
        $('<td>').appendTo('#tableWorks tr:last');
        $('<input>').attr('class', 'form-control count').attr('type', 'text').attr('name', 'summ').attr('disabled', 'disabled').appendTo('#tableWorks td:last');

        //нажатие кнопки Удалить строку в документе
        $('.btnRemove').on('click', function(event){
            event.preventDefault();
            $(this).parent().parent().remove();
            summa('work', $('#tableWorks'));
        });
        loadData('all', 'work');
    }

    //добавление материалов в новый документ
    $("#btnAddMaterials").click(function(){
        loadMaterials();
    });

    //добавление работ в новый документ
    $("#btnAddWorks").click(function(){
        loadWorks();
    });

    //нажатие кнопки Плюс в документе
    $('.tab-content').on('click','.btnPlus', function(event){
        event.preventDefault();
        $(this).prev().find('select').addClass('action');
        plus($(this).attr('data-name'));
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
        modalPlus.saveButton(name);
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
        isNumeric($(this));
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

            //добавление класса кнопки Сохранить документ и выполнение добавления в базу при нажатии на кнопку
            this.saveButton = function(table){
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
                        addData(table, params, 'add');
                        $('#modal').modal('hide');
                    }
                });
            };
            this.deleteButton = function(tables, id_name, id) {
                $('#modal input:submit').addClass('btnDelete');
                $('#modal .btnDelete').click(function (event) {
                    event.preventDefault();
                    for(var n in tables){
                        console.log(tables[n]);
                        deleteForId(tables[n], id_name, id);
                        //завершение всех ajax-запросов
                        $(document).ajaxStop(function() {
                            var url = "/ServicePartner98";
                            $(location).attr('href',url);
                        });
                    }
                });
            }
        };
    }

    //Ajax-запрос на добавление в базу данных
    function addData(table, params, action) {
        $.ajax({
            type: "POST",
            url: "/ServicePartner98/model/ajax.php",
            dataType: 'json',
            data: {table: table, params: params, action: action},
            success: function (id) {
                //выбор в селект только что добавленной позиции
                if(table == 'material' || table == 'work' || table == 'client'){
                    $('select.' + table).append(('<option value=' + id + '>' + params[table] + '</option>'));
                    $('select.' + table).selectpicker('refresh');
                    $('select.action').selectpicker('val', id);
                    $('select.action').parent().parent().parent().find('input[name=price]').val(params['price']).removeAttr('disabled');
                    $('select.action').parent().parent().parent().find('input[name=count]').val('1').removeAttr('disabled');
                    $('select.action').parent().parent().parent().find('#address_' + table).val(params['address']);
                    $('select.action').parent().parent().parent().find('#tel_' + table).val(params['tel']);
                    summa(table, ($('select.action').closest('tr')));
                    $('select.action').removeClass('action');
                }

                //сохранение данных о материалах и работах при сохранении нового документа
                if(table == 'repair'){
                    var inputs;
                    var selected;
                    var tableName = ['Materials', 'Works'];
                    for(var item in tableName){
                        var parametr = new Object();
                        $('#table' + tableName[item] + ' tr').has('input').each(function(){
                            inputs = $(this).find('input[name]');
                            selected = $(this).find('select[name]');
                            parametr['id'] = id;
                            $(inputs).each(function() {
                                var key = $(this).attr('name');
                                var value = $(this).val();
                                if (value) {
                                    parametr[key] = value;
                                }
                            });
                            $(selected).each(function() {
                                var key = $(this).attr('name');
                                var value = $(this).val();
                                if (value) {
                                    parametr[key] = value;
                                }
                            });
                            var saveTable = 'number_' + tableName[item].toLowerCase();
                            addData(saveTable, parametr, 'add');
                        });
                    }
                    document.location.href=$('#saveNewDocument').attr('href');
                }
            }
        });
    }

    //Ajax-запрос на редактирование данных в документе
    function editData(table, id_name, id, params, action) {
        $.ajax({
            type: "POST",
            url: "/ServicePartner98/model/ajax.php",
            dataType: 'json',
            data: {table: table, id_name: id_name, id: id, params: params, action: action},
            success: function (rows) {
                if(table == 'repair') {
                    getMaterialsWorks('many','number_materials', 'id', id);
                    getMaterialsWorks('many','number_works', 'id', id);
                    //завершение всех ajax-запросов
                    $(document).ajaxStop(function() {
                        document.location.href = $('#saveNewDocument').attr('href');
                    });
                }
            }
        });
    }
    //проверка на наличие материалов и работ в базе данных и их изменение, добавление или удаление
    function getMaterialsWorks(count, table, id_name, id){
        $.ajax({
            type: "POST",
            url: "/ServicePartner98/model/ajax.php",
            dataType: 'json',
            data: {count : count, table : table, id_name : id_name, id: id},
            success: function (data) {
                if(table == 'number_materials'){
                    var tableName = 'Materials';
                    var name = 'id_material';
                }
                if(table == 'number_works'){
                    var tableName = 'Works';
                    var name = 'id_work';
                }
                var DataId = new Object();
                var noDataId = new Array();
                var n = 0;
                $('#table' + tableName +' select[name=' + name + ']').each(function(){
                    if($(this).attr('data-id') && $(this).val() != ''){
                        DataId[$(this).attr('data-id')] = $(this).val();
                    }else if($(this).val() != ''){
                        noDataId[n] = $(this).val();
                        n++;
                    }
                });
                //если в базе данных имеются записи
                if(data){
                    for(var item in data){
                        var index = data[item]['idIndex'];
                        if(index in DataId){
                            var params = new Object();
                            var elem = $('#table' + tableName +' tr:has(select[data-id=' + index +'])');
                            var inputs = elem.find('input[name]');
                            var selected = elem.find('select[name]');
                            params['id'] = id;
                            inputs.each(function() {
                                var key = $(this).attr('name');
                                var value = $(this).val();
                                if (value) {
                                    params[key] = value;
                                }
                            });
                            selected.each(function() {
                                var key = $(this).attr('name');
                                var value = $(this).val();
                                if (value) {
                                    params[key] = value;
                                }
                            });
                            editData(table, 'idIndex', index, params, 'edit');
                        }else{
                            deleteForId(table, 'idIndex', index);
                        }
                    }
                }
                //если в базе данных такой записи нет, то добавляем новую
                if(noDataId.length > 0){
                    for(var it in noDataId){
                        console.log(it + '=' + noDataId[it]);
                        var value = noDataId[it];
                        var params = new Object();
                        var elem = $('#table' + tableName +' tr:has(select[data-id!="undefined"])');
                        var inputs = elem.find('input[name]');
                        var selected = elem.find('select[name]');
                        params['id'] = id;
                        inputs.each(function() {
                            var key = $(this).attr('name');
                            var value = $(this).val();
                            if (value) {
                                params[key] = value;
                            }
                        });
                        selected.each(function() {
                            var key = $(this).attr('name');
                            var value = $(this).val();
                            if (value) {
                                params[key] = value;
                            }
                        });
                        addData(table,  params, 'add');
                    }
                }
            }
        });
    }

    //Удаление строки по id
    function deleteForId(table, id_name, id){
        $.ajax({
            type: "POST",
            url: "/ServicePartner98/model/ajax.php",
            dataType: 'json',
            data: {table : table, id_name : id_name, id: id, action: 'delete'},
            success: function (data) {
            }
        });
    }

    //валидация формы при нажатии на кнопке Сохранить
    $('#saveNewDocument').click(function(event){
        event.preventDefault();
        var valid = true;
        if($('select[name=id_client]').val() == ''){
            valid = false;
            $('select[name=id_client]').prev().prev().addClass('error');
        }
        if($('select[name=id_type]').val() == ''){
            valid = false;
            $('select[name=id_type]').prev().prev().addClass('error');
        }
        if($('select[name=id_brend]').val() == ''){
            valid = false;
            $('select[name=id_brend]').prev().prev().addClass('error');
        }
        if($('input[name=number]').val() == ''){
            valid = false;
            $('input[name=number]').addClass('error');
        }else{
            //проверка по базе данных наличия документа с таким номером
            numberData = false;
            $.ajax({
                type: "POST",
                url: "/ServicePartner98/model/ajax.php",
                async: false,
                dataType: 'json',
                data: {count: 'one', table: 'repair', id_name: 'number', id: $('input[name=number]').val()},
                success: function (data) {
                    if (data['number']) {
                        valid = false;
                        $('input[name=number]').addClass('error');
                        $('#numberError').text('Документ с таким номером уже существует!');
                    }
                }
            });
        }

        //если проверка полей прошла успешно, то документ записывается
        if(valid){
            var inputs = $('#repair-data input[name]');
            var textareas = $('#repair-data textarea[name]');
            var selected = $('#repair-data select[name]');
            var params = new Object();
            $(inputs).each(function() {
                var key = $(this).attr('name');
                var value = $(this).val();
                if (value) {
                    params[key] = value;
                }
            });
            $(textareas).each(function() {
                var key = $(this).attr('name');
                var value = $(this).val();
                if (value) {
                    params[key] = value;
                }
            });
            $(selected).each(function() {
                var key = $(this).attr('name');
                var value = $(this).val();
                if (value) {
                    params[key] = value;
                }
            });
            if($('#repairHead').text() == 'Новый документ'){
                addData('repair', params, 'add');
            }
            if($('#repairHead').text() == 'Редактирование документа'){
                var id = $('#typeOfForm').val();
                editData('repair', 'id', id, params, 'edit');
            }
        }
    });

    //Удаление класса ошибки при вводе значений в поле
    $('input[name=number]').keyup(function(){
        $('input[name=number]').removeClass('error');
        isInteger($(this));
        $('#numberError').text('');
    });
    $('select[name=id_client]').change(function(){
        $('select[name=id_client]').prev().prev().removeClass('error');
    });
    $('select[name=id_type]').change(function(){
        $('select[name=id_type]').prev().prev().removeClass('error');
    });
    $('select[name=id_brend]').change(function(){
        $('select[name=id_brend]').prev().prev().removeClass('error');
    });

    //Обработка событий выбора документа из таблицы на главной странице
    $('#tableDocuments tr td:not(:has(button))').mousedown(function(){
        var id = $(this).parent().data('id');
        var url = "/ServicePartner98/page/form_repair/repair/" + id;
        $(location).attr('href',url);
    });
    if($('#typeOfForm').val() > 0){
        var id = $('#typeOfForm').val();
        loadData('one', 'repair', 'id', id);
    }

    //Удаление документа при нажатии кнопки Удалить
    $('button[data-name=removeDocument]').click(function(){
        var id = $(this).closest('tr').data('id');
        var modalDelete = new Modal('', 'Удаление документа', 'Удалить');
        modalDelete.createTable(['Вы действительно хотите удалить документ?']);
        modalDelete.deleteButton(['repair', 'number_materials', 'number_works'], 'id', id);
    });
});
