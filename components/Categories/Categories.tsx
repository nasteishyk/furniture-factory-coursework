import Image from "next/image";
import Link from "next/link";

import s from "./Categories.module.css";

function Categories() {
  return (
    <div className="section">
      <h3 className={s.title}>Categories</h3>
      <ul className={s.list}>
        <li className={s.item}>
          <Link href="/chairs">
            <Image
              src="/images/category-chairs.png"
              alt="Chairs"
              width={370}
              height={175}
            />
          </Link>
        </li>
        <li className={s.item}>
          <Link href="/sofas">
            <Image
              src="/images/category-sofas.png"
              alt="Sofas"
              width={370}
              height={175}
            />
          </Link>
        </li>
        <li className={s.item}>
          <Link href="/desks">
            <Image
              src="/images/category-desks.png"
              alt="Desks"
              width={370}
              height={175}
            />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Categories;
