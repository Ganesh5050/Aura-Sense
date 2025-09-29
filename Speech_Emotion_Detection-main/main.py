import os
import pandas as pd

def create_data_csv(data_dir='data/RAVDESS'):
    """
    Scans the RAVDESS directory, extracts emotions from filenames,
    and saves the data to data/sample_data.csv.
    """
    emotions = {
        '01': 'neutral',
        '02': 'calm',
        '03': 'happy',
        '04': 'sad',
        '05': 'angry',
        '06': 'fearful',
        '07': 'disgust',
        '08': 'surprised'
    }
    
    data = []
    base_path = os.path.abspath(os.path.dirname(__file__))
    full_data_dir = os.path.join(base_path, data_dir)

    for dirname, _, filenames in os.walk(full_data_dir):
        for filename in filenames:
            if filename.endswith('.wav'):
                try:
                    emotion_code = filename.split('-')[2]
                    emotion = emotions.get(emotion_code)
                    if emotion:
                        full_path = os.path.join(dirname, filename)
                        relative_path = os.path.relpath(full_path, base_path).replace('\\', '/')
                        data.append({'filepath': relative_path, 'emotion': emotion})
                except IndexError:
                    continue

    df = pd.DataFrame(data)
    csv_path = os.path.join(base_path, 'data/sample_data.csv')
    df.to_csv(csv_path, index=False)
    print(f"'{csv_path}' created successfully with {len(df)} entries.")

if __name__ == '__main__':
    create_data_csv()