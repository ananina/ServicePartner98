<h3>Материалы</h3>
<table class="table table-hover">
    <tr>
        <td>Наименование</td>
        <td></td>
    </tr>
    <?php foreach($params as $value){?>
        <form action="<?=FPATH?>page/edit/materials/id_material/<?=$value['id_material']?>" method="post">
            <tr>
                <td><input type="text" name="material" value="<?=$value['material']?>"></td>
                <td>
                    <input type="submit" name="button" value="Удалить">
                    <input type="submit" name="button" value="Изменить">
                </td>
            </tr>
        </form>
    <?php }?>
    <form action="<?=FPATH?>page/add/materials" method="post">
        <tr>
            <td><input type="text" name="material"></td>
            <td><input type="submit" value="Добавить"></td>
        </tr>
    </form>
</table>