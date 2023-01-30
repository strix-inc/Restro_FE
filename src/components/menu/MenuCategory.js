import React from 'react'

const MenuCategory = ({ Data, handleCategoryFilter, active, mode }) => {
    return (
        <>
            {
                Data.map((val) => {
                    return <div key={val.id}>
                        <button className="relative category-list px-2 py-3 cursor-pointer w-full" onClick={() => handleCategoryFilter(val.category)}>
                            <div>
                                <div className={`${active === val.category ? (mode === 'black' ? '' : 'absolute right-0 w-full h-12 top-0 bg-gradient-to-l from-blue-100') : ''}`}></div>
                                <div className={`${active === val.category ? 'absolute right-0 w-1 h-12 top-0 bg-purple-500 rounded-l-md' : ''}`}></div>
                            </div>
                            <span className='font-bold flex flex-start'>{val.category}</span>
                        </button><hr />
                    </div>
                })
            }
        </>
    )
}

export default MenuCategory
