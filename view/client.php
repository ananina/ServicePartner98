<div class="panel panel-default panel3">
    <div class="panel-heading">
        <h3 class="panel-title">Клиенты</h3>
    </div>
    <div class="panel-body">
        <table class="table table-hover table-condensed">
            <tr>
                <td>Наименование</td>
                <td>Адрес</td>
                <td>Телефон</td>
                <td></td>
            </tr>
            <form action="<?=FPATH?>page/add/client" method="post">
                <tr>
                    <td><div class="form-group">
                            <input type="text" class="form-control" name="client" data-name="add" placeholder="Введите название клиента...">
                        </div>
                    </td>
                    <td><div class="form-group">
                            <input type="text" class="form-control" name="address" data-name="add" placeholder="Введите адрес...">
                        </div>
                    </td>
                    <td><div class="form-group">
                            <input type="text" class="form-control" name="tel" data-name="add" placeholder="Введите номер телефона...">
                        </div>
                    </td>
                    <td><input type="submit" class="btn btn-default btnAdd" value="Добавить">
                        <span class="text-danger " hidden>Нечего добавлять!!!</span>
                    </td>
                </tr>
            </form>
            <?php foreach($params as $value){?>
                    <tr data-name="client">
                        <td><input type="text" class="form-control" name="client" disabled value="<?=$value['client']?>"></td>
                        <td><input type="text" class="form-control" name="address" disabled value="<?=$value['address']?>"></td>
                        <td><input type="text" class="form-control" name="tel" disabled value="<?=$value['tel']?>"></td>
                        <td>
                            <button class="btn btn-default btnRemove" data-toggle="modal" data-target="#modal" data-path="<?=FPATH?>page/delete/client/id_client/<?=$value['id_client']?>">Удалить</button>
                            <button class="btn btn-default btnEdit" data-toggle="modal" data-target="#modal" data-path="<?=FPATH?>page/edit/client/id_client/<?=$value['id_client']?>">Редактировать</button>
                        </td>
                    </tr>
            <?php } ?>
        </table>
    </div>
</div>

<?=$content?>
