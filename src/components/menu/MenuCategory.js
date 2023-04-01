import React from 'react'


const MenuCategory = ({ Data, handleCategoryFilter, active, mode }) => {
    const UniqueCategory = [];

    const CategoryUnique = Data.filter(element => {
        const isDuplicate = UniqueCategory.includes(element.category_name);

        if (!isDuplicate) {
            UniqueCategory.push(element.category_name);

            return true;
        }

        return false;
    });
    return (
        <>
            {
                CategoryUnique.map((val) => {
                    return <div key={val.id}>
                        <button className="relative category-list px-2 py-3 cursor-pointer w-full" onClick={() => handleCategoryFilter(val.category_name)}>
                            <div>
                                <div className={`${active === val.category_name ? (mode === 'black' ? '' : 'absolute right-0 w-full h-12 top-0 bg-gradient-to-l from-blue-100') : ''}`}></div>
                                <div className={`${active === val.category_name ? 'absolute right-0 w-1 h-12 top-0 bg-blue-500 rounded-l-md' : ''}`}></div>
                            </div>
                            <span className='font-bold flex flex-start'>{val.category_name}</span>
                        </button><hr />
                    </div>
                })
            }
        </>
    )
}

export default MenuCategory
