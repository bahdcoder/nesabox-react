import React from 'react'

const Svg = ({ icon, width = 40, name, height = 40, src }) => {
    const svgs = {
        linode: (
            <svg
                width={width}
                height={height}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
            >
                <path
                    fill="#6bbf32"
                    d="M283.389 312.972l7.65 120.41 156.57-121.131 4.31-108.357z"
                />
                <path
                    fill="#88d652"
                    d="M267.759 66.832l-119.17 50.106 65 376.359 77.45-59.915z"
                />
                <path
                    fill="#3c8819"
                    d="M148.589 116.938l-86.67-50.096 81.25 376.359 70.42 50.096z"
                />
                <path d="M377.191 166.974l-100.156 45.36-6.985 127.169 87.344-56.535-1.538 81.284-80.29 62.117 30.952 14.029 155.796-120.533 5.062-127.191-90.185-25.7zm55.706 137.674l-46.589 36.044 1.465-77.388 48.007-31.073-2.883 72.417z" />
                <path
                    d="M304.221 404.2l-5.296-83.387-16.702-262.969L182.146 0 44.623 57.809l85.12 394.275L213.968 512l92.551-71.603-2.298-36.197zM254.133 88.865l5.798 91.288-77.813 42.757-16.71-96.749 88.725-37.296zM83.734 96.796l51.274 29.636 15.465 89.545-47.297-29.123-19.442-90.058zm28.227 130.747l45.331 27.912 14.624 84.674-41.56-27.38-18.395-85.206zm44.643 206.786l-17.194-79.641 39.517 26.034 13.682 79.221-36.005-25.614zm30.92-180.109l74.51-40.942 5.834 91.853-64.356 41.656-15.988-92.567zm36.605 211.944l-15.059-87.19 60.98-39.47 5.517 86.865-51.438 39.795z"
                    fill="#383838"
                />
            </svg>
        ),
        vultr: (
            <svg
                width={width}
                height={height}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 42 36.09"
            >
                <defs>
                    <style
                        dangerouslySetInnerHTML={{
                            __html: '.cls-3{fill:#007bfc}'
                        }}
                    />
                </defs>
                <path
                    d="M14.63 4a2.09 2.09 0 0 0-1.77-1H2.1A2.1 2.1 0 0 0 0 5.1a2.12 2.12 0 0 0 .32 1.12l2.77 4.07 13.85-3z"
                    transform="translate(0 -3)"
                    fill="#c9f4ff"
                />
                <path
                    d="M17 7.37a2.11 2.11 0 0 0-1.78-1H4.5a2.09 2.09 0 0 0-1.84 3.24l3.09 4.9 14.31-2.24z"
                    transform="translate(0 -3)"
                    fill="#51b9ff"
                />
                <path
                    className="cls-3"
                    d="M5.62 14.31a2.14 2.14 0 0 1-.19-1.88 2.11 2.11 0 0 1 2-1.34h10.72a2.1 2.1 0 0 1 1.78 1l9.63 15.27a2.12 2.12 0 0 1 .32 1.12 2.15 2.15 0 0 1-.32 1.12l-5.38 8.53a2.11 2.11 0 0 1-3.56 0zM32.74 19.19a2.11 2.11 0 0 0 3.56 0l1.85-2.93 3.53-5.6A2.12 2.12 0 0 0 42 9.54a2.15 2.15 0 0 0-.32-1.12L38.88 4a2.11 2.11 0 0 0-1.78-1H26.34a2.1 2.1 0 0 0-2.1 2.1 2 2 0 0 0 .33 1.12z"
                    transform="translate(0 -3)"
                />
            </svg>
        ),
        'digital-ocean': (
            <svg
                width={width}
                height={height}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="65.2 173.5 180 180"
            >
                <style
                    dangerouslySetInnerHTML={{ __html: '.st0{fill:#0080ff}' }}
                />
                <g id="XMLID_229_">
                    <g id="XMLID_690_">
                        <g id="XMLID_691_">
                            <g id="XMLID_44_">
                                <g id="XMLID_48_">
                                    <path
                                        id="XMLID_49_"
                                        className="st0"
                                        d="M155.2 351.7v-34.2c36.2 0 64.3-35.9 50.4-74a51.11 51.11 0 0 0-30.5-30.5c-38.1-13.8-74 14.2-74 50.4H67c0-57.7 55.8-102.7 116.3-83.8 26.4 8.3 47.5 29.3 55.7 55.7 18.9 60.6-26 116.4-83.8 116.4z"
                                    />
                                </g>
                                <path
                                    id="XMLID_47_"
                                    className="st0"
                                    d="M155.3 317.6h-34v-34h34z"
                                />
                                <path
                                    id="XMLID_46_"
                                    className="st0"
                                    d="M121.3 343.8H95.1v-26.2h26.2z"
                                />
                                <path
                                    id="XMLID_45_"
                                    className="st0"
                                    d="M95.1 317.6H73.2v-21.9h21.9v21.9z"
                                />
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        ),
        aws:
            'https://res.cloudinary.com/bahdcoder/image/upload/v1563479621/s3_clya5b.png',
        gitlab:
            'https://res.cloudinary.com/bahdcoder/image/upload/v1563440836/imageedit_1_3764424804_fflt7a.png',
        github:
            'https://res.cloudinary.com/bahdcoder/image/upload/v1563440970/GitHub-Mark-120px-plus_ekryl4.png',
        bitbucket:
            'https://res.cloudinary.com/bahdcoder/image/upload/v1563440912/imageedit_3_5451227750_hd3vcz.png',
        custom:
            'https://res.cloudinary.com/bahdcoder/image/upload/v1563480490/ubuntu_ymonj9.png',
        'no-app': (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 51.976 51.976"
                style={{ enableBackground: 'new 0 0 51.976 51.976' }}
                xmlSpace="preserve"
                width={width}
                height={height}
            >
                <g>
                    <g>
                        <path
                            d="M44.373,7.603c-10.137-10.137-26.632-10.138-36.77,0c-10.138,10.138-10.137,26.632,0,36.77s26.632,10.138,36.77,0   C54.51,34.235,54.51,17.74,44.373,7.603z M36.241,36.241c-0.781,0.781-2.047,0.781-2.828,0l-7.425-7.425l-7.778,7.778   c-0.781,0.781-2.047,0.781-2.828,0c-0.781-0.781-0.781-2.047,0-2.828l7.778-7.778l-7.425-7.425c-0.781-0.781-0.781-2.048,0-2.828   c0.781-0.781,2.047-0.781,2.828,0l7.425,7.425l7.071-7.071c0.781-0.781,2.047-0.781,2.828,0c0.781,0.781,0.781,2.047,0,2.828   l-7.071,7.071l7.425,7.425C37.022,34.194,37.022,35.46,36.241,36.241z"
                            data-original="#000000"
                            className="active-path"
                            data-old_color="#000000"
                            fill="#66788A"
                        />
                    </g>
                </g>{' '}
            </svg>
        )
    }

    return typeof svgs[icon] === 'string' ? (
        <img
            width={width}
            height={height}
            src={svgs[icon]}
            alt={name || svgs[icon]}
        />
    ) : (
        svgs[icon] || null
    )
}

export default Svg
