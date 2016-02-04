<h3>Работы и цены</h3>
<table class="table table-hover">
    <tr>
        <td>Наименование работы</td>
        <td>Цена, руб.</td>
        <td></td>
    </tr>
    <?php foreach($params as $value){?>
        <form action="<?=FPATH?>page/edit/works/id_work/<?=$value['id_work']?>" method="post">
            <tr>
                <td><input type="text" name="work" value="<?=$value['work']?>"></td>
                <td><input type="text" name="price" value="<?=$value['price']?>"></td>
                <td>
                    <input type="submit" name="button" value="Удалить">
                    <input type="submit" name="button" value="Изменить">
                </td>
            </tr>
        </form>
    <?php }?>
    <form action="<?=FPATH?>page/add/works" method="post">
        <tr>
            <td><input type="text" name="work"></td>
            <td><input type="text" name="price"></td>
            <td><input type="submit" value="Добавить"></td>
        </tr>
    </form>
</table>