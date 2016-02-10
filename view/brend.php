<div class="panel panel-default panel1" >
    <div class="panel-heading">
        <h3 class="panel-title">Производители</h3>
    </div>
    <div class="panel-body">
        <table class="table table-hover">
            <tr>
                <td>Наименование</td>
                <td></td>
            </tr>
            <form action="<?=FPATH?>page/add/brend" method="post">
                <tr data-name="newBrend">
                    <td><div class="form-group">
                            <input type="text" class="form-control" name="brend" data-name="newBrend" placeholder="Введите название производителя...">
                        </div>
                    </td>
                    <td><input type="submit" class="btn btn-default btnAdd" value="Добавить">
                        <span class="text-danger " hidden>Нечего добавлять!!!</span>
                    </td>
                </tr>
            </form>
            <?php foreach($params as $value){?>
                    <tr data-name="brend">
                        <td><input type="text" class="form-control" name="brend" disabled data-path="<?=FPATH?>page/edit/brend/id_brend/<?=$value['id_brend']?>" value="<?=$value['brend']?>"</td>
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