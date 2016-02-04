<h3>Типы устройств</h3>
<table class="table table-hover">
    <tr>
        <td>Наименование</td>
        <td></td>
    </tr>
    <?php foreach($params as $value){?>
        <form action="<?=FPATH?>page/edit/type/id_type/<?=$value['id_type']?>" method="post">
            <tr>
                <td><input type="text" name="type" value="<?=$value['type']?>"></td>
                <td>
                    <input type="submit" name="button" value="Удалить">
                    <input type="submit" name="button" value="Изменить">
                </td>
            </tr>
        </form>
    <?php }?>
    <form action="<?=FPATH?>page/add/type" method="post">
        <tr>
            <td><input type="text" name="type"></td>
            <td><input type="submit" value="Добавить"></td>
        </tr>
    </form>
</table>