<div class="panel panel-default panel1">
    <div class="panel-heading">
        <h3 class="panel-title">Подразделения</h3>
    </div>
    <div class="panel-body">
        <table class="table table-hover">
            <tr>
                <td>Наименование</td>
                <td></td>
            </tr>
            <form action="<?=FPATH?>page/add/location" method="post">
                <tr data-name="newLocation">
                    <td><div class="form-group">
                            <input type="text" class="form-control" name="location" data-name="newLocation" placeholder="Введите название подразделения...">
                        </div>
                    </td>
                    <td><input type="submit" class="btn btn-default btnAdd" value="Добавить">
                        <span class="text-danger " hidden>Нечего добавлять!!!</span>
                    </td>
                </tr>
            </form>
            <?php foreach($params as $value){?>
                    <tr data-name="location">
                        <td><input type="text" class="form-control" name="location" disabled data-path="<?=FPATH?>page/edit/location/id_location/<?=$value['id_location']?>" value="<?=$value['location']?>"></td>
                        <td>
                            <button class="btn btn-default btnRemove" data-toggle="modal" data-target="#removeModal">Удалить</button>
                            <button class="btn btn-default btnEdit" data-toggle="modal" data-target="#editModal">Редактировать</button>
                        </td>
                    </tr>
            <?php }?>
        </table>
    </div>
</div>

<?=$content?>