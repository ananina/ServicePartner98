<div class="panel panel-default panel2">
    <div class="panel-heading">
        <h3 class="panel-title">Работы и цены</h3>
    </div>
    <div class="panel-body">
        <table class="table table-hover">
            <tr>
                <td>Наименование работы</td>
                <td>Цена, руб.</td>
                <td></td>
            </tr>
            <form action="<?=FPATH?>page/add/work" method="post">
                <tr data-name="newWork">
                    <td><div class="form-group">
                            <input type="text" class="form-control" name="work" data-name="newWork" placeholder="Введите название работы...">
                        </div>
                    </td>
                    <td><div class="form-group">
                            <input type="text" class="form-control" name="price" data-name="newWork" placeholder="Введите цену работы...">
                        </div>
                    </td>
                    <td><input type="submit" class="btn btn-default btnAdd" value="Добавить">
                        <span class="text-danger " hidden>Нечего добавлять!!!</span>
                    </td>
                </tr>
            </form>
            <?php foreach($params as $value){?>
                    <tr data-name="work">
                        <td><input type="text" class="form-control" name="work" disabled data-path="<?=FPATH?>page/edit/work/id_work/<?=$value['id_work']?>" value="<?=$value['work']?>"></td>
                        <td><input type="text" class="form-control" name="price" disabled value="<?=$value['price']?>"></td>
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