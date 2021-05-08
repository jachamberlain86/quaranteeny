import { store } from '../app/store';
import { changeByAmount } from '../features/meter/meterSlice';
import { elements } from '../data/elements.data';
import { Elements } from '../interfaces/elements.interface';
import { Element } from '../interfaces/element.interface';
import { MeterChange } from '../interfaces/meterChange.interface';

function getElementData(element: string): Element {
  return elements[element as keyof Elements];
}

export const handleInteraction = (element: string): void => {
  console.log('this called');
  const elementData: Element = getElementData(element);
  elementData.meterImpacts.forEach((meter: MeterChange) => {
    console.log(meter);
    store.dispatch(changeByAmount(meter));
  });
};

// : AppThunk => (dispatch) => {
//
//   });
// };
