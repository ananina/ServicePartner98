<div class="panel panel-default panel3">
    <div class="panel-heading">
        <h3 class="panel-title">Клиенты</h3>
    </div>
    <div class="panel-body">
        <table class="table table-hover">
            <tr>
                <td>Наименование</td>
                <td>Адрес</td>
                <td>Телефон</td>
                <td></td>
            </tr>
            <?php foreach($params as $value){?>
                <form action="<?=FPATH?>page/edit/clients/id_client/<?=$value['id_client']?>" method="post">
                    <tr>
                        <td><input type="text" class="form-control" name="client" value="<?=$value['client']?>"></td>
                        <td><input type="text" class="form-control" name="address" value="<?=$value['address']?>"></td>
                        <td><input type="text" class="form-control" name="tel" value="<?=$value['tel']?>"></td>
                        <td>
                            <input type="submit" name="button" class="btn btn-default" value="Удалить">
                            <input type="submit" name="button" class="btn btn-default" value="Изменить">
                        </td>
                    </tr>
                </form>
            <?php } ?>

            <form action="<?=FPATH?>page/add/clients" method="post">
                <tr>
                    <td><input type="text" class="form-control" name="client"></td>
                    <td><input type="text" class="form-control" name="address"></td>
                    <td><input type="text" class="form-control" name="tel"></td>
                    <td><input type="submit" class="btn btn-default" value="Добавить"></td>
                </tr>
            </form>
        </table>
    </div>
</div>


