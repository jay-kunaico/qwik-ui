import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import {
  Combobox,
  ComboboxLabel,
  ComboboxControl,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxPopover,
  ComboboxListbox,
  ComboboxOption,
  ResolvedOption,
} from '@qwik-ui/headless';

import './animation.css';

export default component$(() => {
  const isListboxOpenSig = useSignal(false);

  useStyles$(`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes fadeOut {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  .listbox-animation.popover-showing {
    animation: fadeIn both 500ms ease;
  }
  
  .listbox-animation.popover-closing {
    animation: fadeOut both 500ms ease;
  }
  
  `);

  const animationExample = [
    'Red',
    'Orange',
    'Yellow',
    'Green',
    'Blue',
    'Indigo',
    'Violet',
  ];

  return (
    <Combobox
      class="w-fit"
      options={animationExample}
      filter$={(value: string, options) =>
        options.filter(({ option }) => {
          return option.toLowerCase().startsWith(value.toLowerCase());
        })
      }
      bind:isListboxOpenSig={isListboxOpenSig}
    >
      <ComboboxLabel class=" font-semibold text-white">Streets 🛣️</ComboboxLabel>
      <ComboboxControl class="relative flex items-center rounded-sm border-[1px] border-slate-400 bg-[#1f2532]">
        <ComboboxInput
          class="px-d2 w-44 rounded-sm bg-slate-900 px-2 pr-6 text-white placeholder:text-slate-500"
          placeholder="Wallaby Rd."
        />
        <ComboboxTrigger class="group absolute right-0 h-6 w-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            class="stroke-white transition-transform duration-[450ms] group-aria-expanded:-rotate-180"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </ComboboxTrigger>
      </ComboboxControl>
      <ComboboxPopover class="listbox-animation" gutter={8}>
        <ComboboxListbox
          class={`w-44 rounded-sm border-[1px] border-slate-400 bg-slate-900 px-4 py-2`}
          optionRenderer$={(option: ResolvedOption, index: number) => (
            <ComboboxOption
              key={option.key}
              class="group rounded-sm border-2 border-transparent px-2 text-white hover:bg-slate-500  aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 aria-selected:border-slate-200 aria-selected:bg-slate-500"
              index={index}
              resolved={option}
            >
              {option.label}
            </ComboboxOption>
          )}
        />
      </ComboboxPopover>
    </Combobox>
  );
});
