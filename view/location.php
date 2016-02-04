<h3>Подразделения</h3>
<table class="table table-hover">
    <tr>
        <td>Наименование</td>
        <td></td>
    </tr>
    <?php foreach($params as $value){?>
        <form action="<?=FPATH?>page/edit/location/id_location/<?=$value['id_location']?>" method="post">
            <tr>
                <td><input type="text" name="location" value="<?=$value['location']?>"></td>
                <td>
                    <input type="submit" name="button" value="Удалить">
                    <input type="submit" name="button" value="Изменить">
                </td>
            </tr>
        </form>
    <?php }?>
    <form action="<?=FPATH?>page/add/location" method="post">
        <tr>
            <td><input type="text" name="location"></td>
            <td><input type="submit" value="Добавить"></td>
        </tr>
    </form>
</table>