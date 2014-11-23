function makeForm(fields, options)
{   
    //console.table(fields)
    options || (options = {})
    options.nickName || (options.nickName = '')
    options.context || (options.context = $('<table>'))
    options.formElement || (options.formElement = $('<form>'))
    $formElement = options.formElement
    $formElement.options = options
    $formElement.nickName = options.nickName
    $formElement.context = options.context
    $formElement.append($formElement.context)
    $formElement.labels = []
    $formElement.labelCells = []
    $formElement.inputs = []
    $formElement.inputCells = []
    //console.log($formElement)
    $formElement.addInput = function(field)
    {
        field.id || (field.id = field.name)
        name = field.name
        id = field.id
        field.val || (field.val == "")
        val = field.val
        //console.log(field.type)
        field.type || (field.type == "input")
        type = field.type
        //console.log('creating '+name)

        if(field.type != "select" && field.type != "button")
        {
              $rowElement = $('<tr>')
              $labeltd = $('<td>')
              $inputtd = $('<td>')
              if(type != "hidden")
              {

          

                  $label = $('<label>').text(name.charAt(0).toUpperCase() + name.slice(1)+":")
                  $labeltd.append($label)
                  this.labelCells.push($labeltd)
                  this.labels.push($label)
              }
              else
              {
                  $labeltd.append($("<br>"))
                  $inputtd.append($("<br>"))

              }
              $rowElement.append($labeltd)

              if(this.nickName != '')
                  $input = $('<input>').attr("type", type).attr("id", this.nickName+"-"+id)
              else
                  $input = $('<input>').attr("type", type).attr("id", id)
                  $input.val(val)
              
              $inputtd.append($input)
              this.inputCells.push($inputtd)
              this.inputs.push($input)
              $rowElement.append($inputtd)
              this.context.append($rowElement)

              return $formElement

        }
        else if (field.type == "select")
        {
            //console.log("Calling addSelect:"+field.options.class)
            $formElement.addSelect(field.name, field.options, field.id)
        }
        else if (field.type == "button")
        {
            $formElement.addButton(field.name, field.id)
        }

        
    }
    $formElement.addButton = function(name, id)
    {
        $rowElement = $('<tr>')
        $labeltd = $('<td>')
          
          $inputtd = $('<td>')
          if(this.nickName != '')
            $input = $('<button>').attr("id", this.nickName+"-"+id)
          else
            $input = $('<button>').attr("id", id)
          $input.text(name)
          $inputtd.append($input)
          this.inputCells.push($inputtd)
          this.inputs.push($input)
          $rowElement.append($labeltd).append($inputtd)
        this.context.append($rowElement)

        return $formElement

    }
    $formElement.clearAll = function()
    {
        $.each(this.inputs, function(k,v){
          v.val('')
        })
    }
    $formElement.addSelect = function(name, opts, id)
    {
        var $select
        $rowElement = $('<tr>')


          $labeltd = $('<td>')
          
          $label = $('<label>').text(name.charAt(0).toUpperCase() + name.slice(1)+":")
          $labeltd.append($label)
          this.labelCells.push($labeltd)
          this.labels.push($label)

          $inputtd = $('<td>')
          if(this.nickName != '')
            $select = $('<select>').attr("id", this.nickName+"-"+id)
          else
            $select = $('<select>').attr("id", id)
          $inputtd.append($select)
          this.inputCells.push($inputtd)
          this.inputs.push($select)
          $rowElement.append($labeltd).append($inputtd)
          this.context.append($rowElement)


       /* if(opts instanceof String)
        { */
            // process the "1..10" shortcut using two . for including and three . for excluding
            var params = []
            var x
            var direction
            
            
            x = parseInt(opts)
            //console.log("param:"+x)
            params.push(x);
            n = x.toString().charAt(x.toString().length-1)
            opts = opts.substr(n, opts.length-1)
            //console.log(opts)
            x = opts.substr(opts.lastIndexOf('.')+1, opts.length)
            x = parseInt(x)
            //console.log("param2:"+x)
            params.push(x);
            opts = opts.substr(opts.indexOf("."), opts.lastIndexOf(".")+1)
            //console.log(opts)
            if(params[0] < params[1])
              direction = 1
            if(params[0] > params[1])
              direction = -1
            


            if(opts == "..")
            {
              for(var i=params[0]; i<=params[1]; i+= direction )
              {
                  $option = $('<option>').val(i).text(i)
                  $option.id = id
                  $select.append($option)
              }


            }
            if(opts == "...")
            {
              for(var i=params[0]; i<=params[1]; i+= direction )
              {
                  $option = $('<option>').val(i).text(i)
                  $option.id = id
                  $select.append($option)
              }
            }

       
        return $formElement
    }
    $
    $formElement.getByName = function(name)
    {
            var f
        $.each(this.inputs, function(k,v)
        {
            //console.log(v.attr("id")+" - "+name)
            if(v.attr("id") == name)
            {
              //console.log("returning")
              //console.table(v)
              //console.log("now")
              f =v
              return false
            }
        })  
        return f
    }
    $formElement.getValues = function()
    {
        data = {}
        this.inputs.forEach(function(x){
          x = $(x)  
          data[x.attr('id')] = x.val()

        })
        return data
    }
      //console.table(fields)
    fields.forEach(function(v){
            
        $formElement.addInput(v)

    })

    return $formElement
}