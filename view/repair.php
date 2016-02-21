<div id="tab" class="form-group">
    <ul id="repair-tab" class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active"><a href="#repair-data">Данные о ремонте</a></li>
        <li role="presentation"><a href="#materials-data">Материалы</a></li>
        <li role="presentation"><a href="#works-data">Работы</a></li>
    </ul>
</div>
<form action="" method="post">
    <div class="tab-content">
        <div role="tabpanel" class="tab-pane fade in active" id="repair-data">
            <div class="floatLeft width470">
                <fieldset id="fieldsetDetails">
                    <legend>Реквизиты</legend>
                    <p>Дата: <div class="input-group date date-begin" data-provide="datepicker">
                        <input type="text" class="form-control dateBegin" name="date_begin" value="<?=$date?>">
                        <div class="input-group-addon">
                            <span class="glyphicon glyphicon-th"></span>
                        </div>
                    </div>
                    </p>
                    <p>Номер: <input id="number" class="form-control" type="text" name="number" value="<?=$number?>" required></p>
                </fieldset>

                <fieldset id="fieldsetClient">
                    <legend>Клиент</legend>
                    <p>Ф.И.О.: <p><select class="form-control select client" name="id_client" size="1" required>
                        <?php foreach($clients as $key=>$value){?>
                            <option value="<?=$value['id_client']?>"><?=$value['client']?></option>
                        <?php } ?>
                        </select>
                        <button data-name="client" class="btn btn-default btnPlus" data-toggle="modal" data-target="#modal"><span class="glyphicon glyphicon-plus"></span></button>
                    </p></p>
                    <p>Адрес: <input id="address_client" class="form-control" type="text" disabled></p>
                    <p>Номер телефона: <input id="tel_client" class="form-control" disabled type="text"></p>
                </fieldset>

                <fieldset id="fieldsetStatus">
                    <legend>Статус</legend>
                    <div class="input-group date date-end floatLeft" data-provide="datepicker">
                        <input type="text" class="form-control dateBegin" name="date_status" value="<?=$date?>">
                        <div class="input-group-addon">
                            <span class="glyphicon glyphicon-th"></span>
                        </div>
                    </div>
                    <select class="form-control select status" name="id_status" size="1">
                        <?php foreach($status as $key=>$value){?>
                            <option value="<?=$value['id_status']?>"><?=$value['status']?></option>
                        <?php }?>
                    </select>
                </fieldset>
            </div>

            <div class="floatLeft width310">
                <fieldset id="fieldsetProblem">
                    <legend>Неисправность</legend>
                    <textarea class="form-control" cols="10" rows="5" name="problem"></textarea>
                </fieldset>

                <fieldset id="fieldsetComment">
                    <legend>Комментарий</legend>
                    <textarea class="form-control" cols="10" rows="5" name="comment"></textarea>
                </fieldset>
            </div>

            <fieldset id="fieldsetType">
                <legend>Аппарат</legend>
                <div class="floatLeft">
                    <p class="margin0">Тип <p><select class="form-control select type" name="id_type" size="1" required">
                        <?php foreach($type as $key=>$value){?>
                            <option value="<?=$value['id_type']?>"><?=$value['type']?></option>
                        <?php } ?>
                        </select>
                        <button data-name="type" class="btn btn-default btnPlus" data-toggle="modal" data-target="#modal"><span class="glyphicon glyphicon-plus"></span></button>
                    </p></p>
                    <p class="margin0">Производитель <p><select class="form-control select brend" name="id_brend" size="1" required">
                        <?php foreach($brend as $key=>$value){?>
                            <option value="<?=$value['id_brend']?>"><?=$value['brend']?></option>
                        <?php } ?>
                        </select>
                        <button data-name="brend" class="btn btn-default btnPlus" data-toggle="modal" data-target="#modal"><span class="glyphicon glyphicon-plus"></span></button>
                    </p></p>
                    <p>Модель <input class="form-control" type="text" name="model"</p>
                </div>
                <div class="floatLeft">
                    <p>Серийный номер <input class="form-control" type="text" name="serial_number"</p>
                    <p>Номер партии <input class="form-control" type="text" name="lot_number"</p>
                    <p>Двигатель <input class="form-control" type="text" name="motor"</p>
                </div>
                <div>
                    <p>U = <input class="form-control width230" type="text" name="U"</p>
                    <p>I = <input class="form-control width230" type="text" name="I"</p>
                    <p>W = <input class="form-control width230" type="text" name="W"</p>
                </div>
            </fieldset>

            <fieldset id="fieldsetOther">
                <legend></legend>
                <div class="floatLeft">Гарантия,  мес.<input class="form-control garant" type="number" min="0" max="12" name="garant"></div>
                <div class="floatLeft">Мастер <p><select class="form-control select" name="id_user">
                            <?php foreach($users as $key=>$value){?>
                                <option value="<?=$value['id_user']?>"><?=$value['user']?></option>
                            <?php }?>
                        </select></p>
                </div>
                <div class="floatLeft">Подразделение <p><select class="form-control select" name="id_location">
                            <?php foreach($location as $key=>$value){?>
                                <option value="<?=$value['id_location']?>"><?=$value['location']?></option>
                            <?php }?>
                        </select></p>
                </div>
                <div>Дата окончания ремонта <div class="input-group date date-end" data-provide="datepicker">
                        <input type="text" class="form-control dateEnd" name="date_end">
                        <div class="input-group-addon">
                            <span class="glyphicon glyphicon-th"></span>
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>

        <div role="tabpanel" class="tab-pane fade" id="materials-data">
            <button id="btnAddMaterials" type="button" class="btn btn-primary btn-lg">Добавить</button>
            <table id="tableMaterials" class="table table-hover" data-path="<?=FPATH?>page/add/material">
                <tr>
                    <td>Наименование</td>
                    <td>Цена, руб.</td>
                    <td>Количество, шт.</td>
                    <td>Сумма, руб.</td>
                </tr>
            </table>
            <p class="total material"></p>
        </div>

        <div role="tabpanel" class="tab-pane fade" id="works-data">
            <button id="btnAddWorks" type="button" class="btn btn-primary btn-lg">Добавить</button>
            <table id="tableWorks" class="table table-hover">
                <tr>
                    <td>Наименование</td>
                    <td>Цена, руб.</td>
                    <td>Количество, шт.</td>
                    <td>Сумма, руб.</td>
                </tr>
            </table>
            <p class="total work"></p>
        </div>

        <button id="saveNewDocument" type="submit" class="btn btn-default btn-form"">Сохранить</button>
        <a class="btn btn-default btn-form" href="<?=FPATH?>page/index">Отмена</a>

    </div>
</form>
<?=$content?>