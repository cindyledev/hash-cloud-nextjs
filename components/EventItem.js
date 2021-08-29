import Image from 'next/image';
import Link from 'next/link';

export default function EventItem({ evt }) {
  return (
    <div>
      <div>
        <Image
          src={evt.image ? evt.image : '/images/event-default.png'}
          width={100}
          height={70}
          alt="image"
        />
      </div>
    </div>
  );
}
