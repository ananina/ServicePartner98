<h3>Производители</h3>
<table class="table table-hover">
    <tr>
        <td>Наименование</td>
        <td></td>
    </tr>
    <?php foreach($params as $value){?>
        <form action="<?=FPATH?>page/edit/brend/id_brend/<?=$value['id_brend']?>" method="post">
            <tr>
                <td><input type="text" name="brend" value="<?=$value['brend']?>"</td>
                <td>
                    <input type="submit" name="button" value="Удалить">
                    <input type="submit" name="button" value="Изменить">
                </td>
            </tr>
        </form>
    <?php }?>
    <form action="<?=FPATH?>page/add/brend" method="post">
        <tr>
            <td><input type="text" name="brend"></td>
            <td><input type="submit" value="Добавить"></td>
        </tr>
    </form>
</table>