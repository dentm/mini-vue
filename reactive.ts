function reactive<T extends object, K extends string | symbol>(obj: T) {
    const handler: ProxyHandler<T> = {
        get(target: T, prop: K, receiver: T): any {
            track(target, prop)
            return Reflect.get(target, prop, receiver);
        },
        set(target: T, prop: K, value: any, receiver: T): boolean {
            let oldValue = (target as any)[prop];
            let newValue = Reflect.set(target, prop, value, receiver);
            if (oldValue != newValue) {
                trigger(target, prop)
            }
            return true
        }
    }
    return new Proxy(obj, handler)
}
function ref<T>(val: T) {
    const r = {
        get value() {
            track(r, 'value')
            return val
        },
        set value(newVal) {
            val = newVal;
            trigger(r, 'value')
        }
    }
    return r
}
function computed(getter: Function) {
    const r = ref(0);
    effect(() => r.value = getter())
    return r;
}
function track<T extends object, K extends string | symbol>(target: T, prop: K): void {
    if (activeEffect) {
        if (!weakMap.get(target)) {
            weakMap.set(target, new Map())
        }
        let map = weakMap.get(target);
        if (!map.get(prop)) {
            map.set(prop, new Set());
        }
        let set = map.get(prop);
        set.add((activeEffect))
    }
}
function trigger<T extends object, K extends string | symbol>(target: T, prop: K) {
    if (!weakMap.get(target)) {
        return
    }
    let map = weakMap.get(target);
    if (!map.get(prop)) {
        return
    }
    let set = map.get(prop);
    set.forEach((fn: Function) => fn());
}

let activeEffect: Function | null = null;

const effect = (fn: Function) => {
    activeEffect = fn;
    activeEffect();
    activeEffect = null;
}

const weakMap: WeakMap<object, any> = new WeakMap();

const product = reactive({
    price: 5,
    quantity: 10
})

const sale = computed(() => {
    return product.price * 0.9
})

const total = computed(() => {
    return sale.value * product.quantity
})


console.log(total.value);

product.quantity = 20

console.log(total.value);

product.price = 10

console.log(total.value);
