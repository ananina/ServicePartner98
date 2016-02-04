<h3>Клиенты</h3>
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
                <td><input type="text" name="client" value="<?=$value['client']?>"></td>
                <td><input type="text" name="address" value="<?=$value['address']?>"></td>
                <td><input type="text" name="tel" value="<?=$value['tel']?>"></td>
                <td>
                    <input type="submit" name="button" value="Удалить">
                    <input type="submit" name="button" value="Изменить">
                </td>
            </tr>
        </form>
    <?php } ?>

    <form action="<?=FPATH?>page/add/clients" method="post">
        <tr>
            <td><input type="text" name="client"></td>
            <td><input type="text" name="address"></td>
            <td><input type="text" name="tel"></td>
            <td><input type="submit" value="Добавить"></td>
        </tr>
    </form>
</table>