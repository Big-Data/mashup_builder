
(function() {

var JSONPWidget = function() {
  JSONPWidget.superclass.constructor.apply(this, arguments);
}

Ext.extend(JSONPWidget, afrous.editor.ActionWidget, {

  renderInputFields : function() {
    JSONPWidget.superclass.renderInputFields.apply(this, arguments);

    mbuilder.lang.forEach(
      this.getPropertyFields(),
      function (field) {
        field.store.removeAll();
        field.control.on('select', this.generateInputs, this);
      },
      this
    );
  }
  ,

  getPropertyFields : function() {
    return jQuery.grep(this.inputFields, function(f) {
      return /^(format)Field/.test(f.getName());
    });
  }
  ,

  getCallbackParameterField : function() {
    return mbuilder.lang.find(this.inputFields, function(f) {
      return f.getName()=='jsonpParam';
    });
  }
  ,

  generateInputs : function() {
    var formatField = mbuilder.lang.find(this.inputFields, function(f) {
      return f.getName()=='formatField';
    });

    var field = this.getCallbackParameterField();
    var format = formatField.getValue();
    if(format == 'JSON' || format == 'XML')
    {
      if(field)
        field.destroy();
    }
    else if(format == 'JSONP')
    {
      if(!field)
        this.createBindField({ name : 'jsonpParam',
                              label : 'JSONP callback parameter',
                               type : 'String' });
    }
  }

});

afrous.editor.widgets.register('Ajax.JSONP', JSONPWidget);

})();

