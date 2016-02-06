<form action="<?=FPATH?>page/new_remont/repair" method="post">
    <div class="form-group">
        <ul id="repair-tab" class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#repair-data">Данные о ремонте</a></li>
            <li role="presentation"><a href="#materials-data">Материалы</a></li>
            <li role="presentation"><a href="#works-data">Работы</a></li>
        </ul>
    </div>

    <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="repair-data">
            <fieldset>
                <legend>Реквизиты</legend>

                <p>Дата: <div class="input-group date date-begin" data-provide="datepicker">
                    <input type="text" class="form-control dateBegin" name="date_begin" value="<?php echo date("d.m.Y");?>">
                    <div class="input-group-addon">
                        <span class="glyphicon glyphicon-th"></span>
                    </div>
                </div>
                </p>
                <p>Номер: <input class="form-control" type="text" name="number"></p>
            </fieldset>
            <fieldset>
                <legend>Клиент</legend>
                <p>Ф.И.О.: <select class="form-control" name="id_client" size="1" required">
                    <option value="0" disabled>Выберите клиента</option>
                    <?php foreach($clients as $key=>$value){?>
                    <option value="<?=$value['id_client']?>"><?=$value['client']?></option></p>
                <?php } ?>
                </select>
                <p>Адрес: <input id="address_client" class="form-control" type="text" disabled></p>
                <p>Номер телефона: <input id="tel_client" class="form-control" disabled type="text"></p>
            </fieldset>
            <fieldset>
                <legend>Аппарат</legend>
                <p>Тип <select class="form-control" name="id_type" size="1" required">
                    <?php foreach($type as $key=>$value){?>
                    <option value="<?=$value['id_type']?>"><?=$value['type']?></option></p>
                <?php } ?>
                </select>
                <p>Производитель <select class="form-control" name="id_brend" size="1" required">
                    <?php foreach($brend as $key=>$value){?>
                    <option value="<?=$value['id_brend']?>"><?=$value['brend']?></option></p>
            <?php } ?>
                </select>
                <p>Модель <input class="form-control" type="text" name="model"</p>
                <p>Серийный номер <input class="form-control" type="text" name="serial_number"</p>
                <p>Двигатель <input class="form-control" type="text" name="motor"</p>
                <p>U = <input class="form-control" type="text" name="U"</p>
                <p>I = <input class="form-control" type="text" name="I"</p>
                <p>W = <input class="form-control" type="text" name="W"</p>
            </fieldset>
            <fieldset>
                <legend>Неисправность</legend>
                <textarea class="form-control" cols="10" rows="5" name="problem"></textarea>
            </fieldset>
            <fieldset>
                <legend>Статус</legend>
                <input class="form-control" type="date" name="date_end">
                <select class="form-control" name="id_status" size="1">
                    <?php foreach($status as $key=>$value){?>
                        <option value="<?=$value['id_status']?>"><?=$value['status']?></option>
                    <?php }?>
                </select>
            </fieldset>
            <fieldset>
                <legend>Комментарий</legend>
                <textarea class="form-control" cols="10" rows="5" name="comment"></textarea>
            </fieldset>
            <span>Гарантия <input class="form-control" type="text" name="garant"> мес.  |</span>
                    <span>Мастер <select class="form-control" name="id_user">
                            <?php foreach($users as $key=>$value){?>
                                <option value="<?=$value['id_user']?>"><?=$value['user']?></option>
                            <?php }?>
                        </select>
                      |</span>
                    <span>Подразделение <select class="form-control" name="id_location">
                            <?php foreach($location as $key=>$value){?>
                                <option value="<?=$value['id_location']?>"><?=$value['location']?></option>
                            <?php }?>
                        </select>
                            |</span>
            <span>Дата окончания ремонта <div class="input-group date date-end" data-provide="datepicker">
                    <input type="text" class="form-control dateEnd" name="date_end">
                    <div class="input-group-addon">
                        <span class="glyphicon glyphicon-th"></span>
                    </div>
                </div>
            </span>
        </div>
        <div role="tabpanel" class="tab-pane" id="materials-data"> </div>
        <div role="tabpanel" class="tab-pane" id="works-data"> </div>
    </div>

    <button type="submit" class="btn btn-default">Submit</button>
</form>
