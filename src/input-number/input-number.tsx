import { AddIcon, RemoveIcon, ChevronDownIcon, ChevronUpIcon } from 'tdesign-icons-vue-next';
import { defineComponent, SetupContext } from 'vue';
import TButton from '../button';
import TInput from '../input';
import props from './props';
import { TdInputNumberProps } from './type';
import useInputNumber from './useInputNumber';

export default defineComponent({
  name: 'TInputNumber',

  props,

  // 保持纯净（逻辑和节点渲染分开）
  setup(props: TdInputNumberProps, context: SetupContext) {
    const p = useInputNumber(props);
    const { inputRef } = p;

    context.expose({ ...p });

    return () => {
      const reduceIcon =
        props.theme === 'column' ? <ChevronDownIcon size={props.size} /> : <RemoveIcon size={props.size} />;
      const addIcon = props.theme === 'column' ? <ChevronUpIcon size={props.size} /> : <AddIcon size={props.size} />;
      const status = p.isError.value ? 'error' : props.status;
      return (
        <div class={p.wrapClasses.value}>
          {props.theme !== 'normal' && (
            <TButton
              class={p.reduceClasses.value}
              disabled={p.tDisabled.value}
              onClick={p.handleReduce}
              variant="outline"
              shape="square"
              icon={() => reduceIcon}
            />
          )}
          <TInput
            ref={inputRef}
            disabled={p.tDisabled.value}
            readonly={props.readonly}
            autocomplete="off"
            placeholder={props.placeholder}
            unselectable={props.readonly ? 'on' : 'off'}
            autoWidth={props.autoWidth}
            align={props.align || (props.theme === 'row' ? 'center' : undefined)}
            status={status}
            label={props.label}
            suffix={props.suffix}
            {...p.listeners}
            {...props.inputProps}
            v-slots={context.slots}
            value={p.userInput.value}
            onChange={p.onInnerInputChange}
          />
          {props.theme !== 'normal' && (
            <TButton
              class={p.addClasses.value}
              disabled={p.tDisabled.value}
              onClick={p.handleAdd}
              variant="outline"
              shape="square"
              icon={() => addIcon}
            />
          )}
          {props.tips && (
            <div class={`${p.classPrefix.value}-input__tips ${p.classPrefix.value}-input__tips--${status}`}>
              {props.tips}
            </div>
          )}
        </div>
      );
    };
  },
});
