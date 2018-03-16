Ext.define('app.view.base.PagedGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'PagedGrid',

    newPagingbar: function () {
        return {
            xtype: 'pagingtoolbar',
            dock: this.pagingbarDock,
            // dock: 'bottom',
            border: true,
            inputItemWidth: 80,
            displayInfo: true,
            displayMsg: _('Items') + ' {0}-{1}, ' + _('Total Count:') + '{2}',
            emptyMsg: _("Empty"),
            items: [
                '-',
                {
                    fieldLabel: _('Page Size'),
                    xtype: 'combobox',
                    width: 170,
                    padding: '0 0 0 5',
                    displayField: 'val',
                    valueField: 'val',
                    multiSelect: false,
                    editable: false,
                    labelWidth: 60,
                    store: Ext.create('Ext.data.Store', this.pagingbarConfig),
                    value: this.pagingbarDefaultValue,
                    listeners: {
                        change: function (me, newValue, oldValue, ops) {
                            var grid = this.up('grid');
                            Ext.apply(grid.store, { pageSize: newValue });
                            this.up('pagingtoolbar').moveFirst();
                        }
                    }
                }
            ]
        }
    },

    initComponent: function () {
        //修复Pagingtoolbar 删除最后一页全部记录BUG || 翻页后查询显示异常BUG
        //使用Ext.override  重写类内的方法
        Ext.override(Ext.toolbar.Paging,{
           onLoad: function () {
               var me = this,
                   pageData,
                   currPage,
                   pageCount,
                   afterText,
                   count,
                   isEmpty,
                   item;

               count = me.store.getCount();
               isEmpty = count === 0;
               if (!isEmpty) {
                   pageData = me.getPageData();
                   currPage = pageData.currentPage;
                   pageCount = pageData.pageCount;

                   // Check for invalid current page.
                   if (currPage > pageCount) {
                       // If the surrent page is beyond the loaded end,
                       // jump back to the loaded end if there is a valid page count.
                       if (pageCount > 0) {
                           me.store.loadPage(pageCount);
                       }
                       // If no pages, reset the page field.
                       else {
                           me.getInputItem().reset();
                       }
                       return;
                   }

                   afterText = Ext.String.format(me.afterPageText, isNaN(pageCount) ? 1 : pageCount);
               } else {
                   pageData = me.getPageData();
                   currPage = pageData.currentPage;
                   pageCount = pageData.pageCount;

                   if (currPage > pageCount) {

                       if (pageCount > 0) {
                           me.store.loadPage(pageCount);
                           return;
                       } else
                       {
                           currPage = 0;
                           pageCount = 0;
                           afterText = Ext.String.format(me.afterPageText, 0);
                       }

                   } else {
                       currPage = 0;
                       pageCount = 0;
                       afterText = Ext.String.format(me.afterPageText, 0);
                   }
               }

               Ext.suspendLayouts();
               item = me.child('#afterTextItem');
               if (item) {
                   item.update(afterText);
               }
               item = me.getInputItem();
               if (item) {
                   item.setDisabled(isEmpty).setValue(currPage);
               }
               me.setChildDisabled('#first', currPage === 1 || isEmpty);
               me.setChildDisabled('#prev', currPage === 1 || isEmpty);
               me.setChildDisabled('#next', currPage === pageCount || isEmpty);
               me.setChildDisabled('#last', currPage === pageCount || isEmpty);
               me.setChildDisabled('#refresh', false);
               me.updateInfo();
               Ext.resumeLayouts(true);

               if (!me.calledInternal) {
                   me.fireEvent('change', me, pageData || me.emptyPageData);
               }
           }
        });

        if (this.pagingbarDock == 'top') {
            if (!this.tbar) {
                this.tbar = this.newPagingbar()
            }
        } else {
            if (!this.bbar) {
                this.bbar = this.newPagingbar()
            }
        }

        this.callParent();
    }

});
