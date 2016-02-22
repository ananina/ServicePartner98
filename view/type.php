<div class="panel panel-default panel1">
    <div class="panel-heading">
        <h3 class="panel-title">Типы устройств</h3>
    </div>
    <div class="panel-body">
        <table class="table table-hover table-condensed table-main">
            <thead>
                <tr>
                    <td>Наименование</td>
                    <td></td>
                </tr>
            </thead>
            <form action="<?=FPATH?>page/add/type" method="post">
                <tr>
                    <td><div class="form-group">
                            <input type="text" class="form-control" name="type" data-name="add" placeholder="Введите тип устройства...">
                        </div>
                    </td>
                    <td><input type="submit" class="btn btn-default btnAdd" value="Добавить">
                        <span class="text-danger " hidden>Нечего добавлять!!!</span>
                    </td>
                </tr>
            </form>
            <?php foreach($params as $value){?>
                    <tr data-name="type">
                        <td><input type="text" class="form-control" name="type" disabled value="<?=$value['type']?>"></td>
                        <td>
                            <button class="btn btn-default btnRemove" data-toggle="modal" data-target="#modal" data-path="<?=FPATH?>page/delete/type/id_type/<?=$value['id_type']?>">Удалить</button>
                            <button class="btn btn-default btnEdit" data-toggle="modal" data-target="#modal" data-path="<?=FPATH?>page/edit/type/id_type/<?=$value['id_type']?>">Редактировать</button>
                        </td>
                    </tr>
            <?php }?>
        </table>
    </div>
</div>

<?=$content?>