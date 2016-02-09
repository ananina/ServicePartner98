<div class="panel panel-default panel1">
    <div class="panel-heading">
        <h3 class="panel-title">Типы устройств</h3>
    </div>
    <div class="panel-body">
        <table class="table table-hover">
            <tr>
                <td>Наименование</td>
                <td></td>
            </tr>
            <?php foreach($params as $value){?>
                <form action="<?=FPATH?>page/edit/type/id_type/<?=$value['id_type']?>" method="post">
                    <tr>
                        <td><input type="text" class="form-control" name="type" value="<?=$value['type']?>"></td>
                        <td>
                            <input type="submit" name="button" class="btn btn-default" value="Удалить">
                            <input type="submit" name="button" class="btn btn-default" value="Изменить">
                        </td>
                    </tr>
                </form>
            <?php }?>
            <form action="<?=FPATH?>page/add/type" method="post">
                <tr>
                    <td><input type="text" class="form-control" name="type"></td>
                    <td><input type="submit" class="btn btn-default" value="Добавить"></td>
                </tr>
            </form>
        </table>
    </div>
</div>

