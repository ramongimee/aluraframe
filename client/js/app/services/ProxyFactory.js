class ProxyFactory{
    static createProxy(objeto,props,acao){

        return new Proxy(new ListaNegociacoes(),{
            get(target, prop,receiver) {
                
                if(props.includes(prop) && typeof(target[prop]) == typeof(Function)){

                    return function(){
                        Reflect.apply(target[prop], target,arguments);
                        self._negociacoesView.update(target);
                    }

                }
                return Reflect.get(target,prop,receiver);
            }
        });
    }
}