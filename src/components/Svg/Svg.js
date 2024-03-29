import React from 'react'

const Svg = ({ icon, width = 40, name, className = '', height = 40, src }) => {
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
        ),
        ghost: (
            <svg
                width={width}
                height={height}
                viewBox="0 0 85 87"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g fillRule="evenodd" opacity=".6">
                    <rect
                        x=".209"
                        y="69.017"
                        width="33.643"
                        height="17.014"
                        rx={4}
                    />
                    <rect
                        x="50.672"
                        y="69.017"
                        width="33.622"
                        height="17.014"
                        rx={4}
                    />
                    <rect
                        x=".184"
                        y="34.99"
                        width="84.121"
                        height="17.014"
                        rx={4}
                    />
                    <rect
                        x=".209"
                        y=".964"
                        width="50.469"
                        height="17.013"
                        rx={4}
                    />
                    <rect
                        x="67.494"
                        y=".964"
                        width="16.821"
                        height="17.013"
                        rx={4}
                    />
                </g>
            </svg>
        ),
        lock: (
            <svg
                x="0px"
                y="0px"
                id="Capa_1"
                width={width}
                version="1.1"
                height={height}
                xmlSpace="preserve"
                viewBox="0 0 401.998 401.998"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                style={{ enableBackground: 'new 0 0 401.998 401.998' }}
            >
                <g>
                    <g>
                        <path
                            d="M357.45,190.721c-5.331-5.33-11.8-7.993-19.417-7.993h-9.131v-54.821c0-35.022-12.559-65.093-37.685-90.218   C266.093,12.563,236.025,0,200.998,0c-35.026,0-65.1,12.563-90.222,37.688C85.65,62.814,73.091,92.884,73.091,127.907v54.821   h-9.135c-7.611,0-14.084,2.663-19.414,7.993c-5.33,5.326-7.994,11.799-7.994,19.417V374.59c0,7.611,2.665,14.086,7.994,19.417   c5.33,5.325,11.803,7.991,19.414,7.991H338.04c7.617,0,14.085-2.663,19.417-7.991c5.325-5.331,7.994-11.806,7.994-19.417V210.135   C365.455,202.523,362.782,196.051,357.45,190.721z M274.087,182.728H127.909v-54.821c0-20.175,7.139-37.402,21.414-51.675   c14.277-14.275,31.501-21.411,51.678-21.411c20.179,0,37.399,7.135,51.677,21.411c14.271,14.272,21.409,31.5,21.409,51.675V182.728   z"
                            data-original="#000000"
                            className="active-path"
                            data-old_color="#000000"
                            fill="#47B881"
                        />
                    </g>
                </g>{' '}
            </svg>
        ),
        shield: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                width={width}
                height={height}
                viewBox="0 0 438.543 438.543"
                style={{ enableBackground: 'new 0 0 438.543 438.543' }}
                xmlSpace="preserve"
            >
                <g>
                    <g>
                        <path
                            d="M396.58,5.424C392.959,1.807,388.675,0,383.727,0H54.824c-4.952,0-9.235,1.807-12.852,5.424   c-3.615,3.615-5.424,7.898-5.424,12.847v219.268c0,16.371,3.186,32.596,9.563,48.681c6.374,16.084,14.274,30.361,23.697,42.828   c9.423,12.47,20.651,24.605,33.689,36.405c13.04,11.806,25.078,21.6,36.116,29.409c11.038,7.803,22.554,15.181,34.545,22.121   c11.991,6.943,20.511,11.663,25.553,14.134c5.043,2.478,9.088,4.38,12.132,5.708c2.286,1.143,4.758,1.718,7.426,1.718   c2.671,0,5.14-0.575,7.428-1.718c3.042-1.328,7.087-3.23,12.128-5.708c5.041-2.471,13.565-7.19,25.557-14.134   c11.984-6.94,23.504-14.318,34.54-22.121c11.043-7.81,23.079-17.604,36.121-29.409c13.031-11.8,24.263-23.936,33.685-36.405   c9.421-12.467,17.319-26.744,23.705-42.828c6.379-16.085,9.562-32.31,9.562-48.681V18.271   C401.994,13.319,400.187,9.04,396.58,5.424z M347.178,237.539c0,33.5-22.367,67.759-67.095,102.781   c-17.892,14.082-38.164,27.124-60.813,39.115V54.813h127.908V237.539z"
                            data-original="#000000"
                            className="active-path"
                            data-old_color="#000000"
                            fill="#47B881"
                        />
                    </g>
                </g>{' '}
            </svg>
        ),
        github_light: (
            <svg
                className={className}
                width={width}
                height={height}
                fill="currentColor"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M512 0C229.25 0 0 229.25 0 512c0 226.25 146.688 418.125 350.156 485.812 25.594 4.688 34.938-11.125 34.938-24.625 0-12.188-0.469-52.562-0.719-95.312C242 908.812 211.906 817.5 211.906 817.5c-23.312-59.125-56.844-74.875-56.844-74.875-46.531-31.75 3.53-31.125 3.53-31.125 51.406 3.562 78.47 52.75 78.47 52.75 45.688 78.25 119.875 55.625 149 42.5 4.654-33 17.904-55.625 32.5-68.375C304.906 725.438 185.344 681.5 185.344 485.312c0-55.938 19.969-101.562 52.656-137.406-5.219-13-22.844-65.094 5.062-135.562 0 0 42.938-13.75 140.812 52.5 40.812-11.406 84.594-17.031 128.125-17.219 43.5 0.188 87.312 5.875 128.188 17.281 97.688-66.312 140.688-52.5 140.688-52.5 28 70.531 10.375 122.562 5.125 135.5 32.812 35.844 52.625 81.469 52.625 137.406 0 196.688-119.75 240-233.812 252.688 18.438 15.875 34.75 47 34.75 94.75 0 68.438-0.688 123.625-0.688 140.5 0 13.625 9.312 29.562 35.25 24.562C877.438 930 1024 738.125 1024 512 1024 229.25 794.75 0 512 0z" />
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
