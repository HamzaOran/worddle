import { observer } from 'mobx-react-lite';

interface QuertyProps {
  store: {
    exactGuesses: string[];
    inexactGuesses: string[];
    allGuesses: string[];
    
  };
}

const Querty: React.FC<QuertyProps> = observer(({ store }) => {
  const qwerty = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

  return (
    <div className='mt-12'>
      {qwerty.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center">
          {row.split('').map((char, charIndex) => {
            const bgColor = store.exactGuesses.includes(char)
              ? 'bg-green-400'
              : store.inexactGuesses.includes(char)
              ? 'bg-yellow-400'
              : store.allGuesses.includes(char)
              ? 'bg-gray-400'
              : 'bg-gray-200';

            return (
              <div
                key={`${rowIndex}-${charIndex}`} 
                className={`rounded-m m-px flex h-10 w-10 items-center justify-center uppercase ${bgColor}`}
              >
                {char}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
});

export default Querty;
