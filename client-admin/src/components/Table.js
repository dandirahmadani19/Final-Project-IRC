import TableRow from "./TableRow";

export default function Table() {
  return (
  <div class="flex-col justify-center">
    <table class="w-full text-sm  text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-600 uppercase bg-orange-400 ">
        <tr>
          <th scope="col" class="px-6 py-3">
            No
          </th>
          <th scope="col" class="px-6 py-3">
            CFID
          </th>
          <th scope="col" class="px-14 py-3">
            Name
          </th>
          <th scope="col" class="px-6 py-3">
            HSCODE
          </th>
          <th scope="col" class="px-6 py-3">
            current QTY
          </th>
          <th scope="col" class="px-6 py-3">
            target QTY
          </th>
          <th scope="col" class="px-6 py-3">
            expired date
          </th>
          <th scope="col" class="px-6 py-3 ">
            status
          </th>
          <th scope="col" class="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <TableRow/>
        {/* {productsLocal.map((el, i) => {
          return <TableRow product={el} index={i + 1} key={el.id} />;
        })} */}
      </tbody>
    </table>
  </div>
  )
}
